import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMessagesByChatId(chatId: number) {
    const messages = await this.prismaService.message.findMany({
      where: {
        chatId,
      },
      include: {
        sender: {
          omit: {
            password: true,
            description: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  }

  async sendMessage(dto: SendMessageDto) {
    const message = await this.prismaService.message.create({
      data: dto,
    });

    return message;
  }
}
