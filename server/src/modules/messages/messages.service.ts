import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { EditMessageDto } from './dto/edit-message.dto';
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

  async editMessage(id: number, dto: EditMessageDto) {
    await this.findMessageByIdOrThrow(id);

    const message = await this.prismaService.message.update({
      where: { id },
      data: dto,
    });

    return message;
  }

  private async findMessageByIdOrThrow(id: number) {
    const existedMessage = await this.prismaService.message.findUnique({
      where: { id },
    });

    if (!existedMessage) {
      throw new NotFoundException('Message is not found');
    }

    return existedMessage;
  }
}
