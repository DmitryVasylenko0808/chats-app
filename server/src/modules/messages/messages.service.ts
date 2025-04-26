import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

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
    console.log(messages);

    return messages;
  }
}
