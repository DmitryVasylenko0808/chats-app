import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findChats(userId: number) {
    const chats = await this.prismaService.chat.findMany({
      where: {
        members: {
          some: { id: userId },
        },
      },
      include: {
        members: {
          omit: {
            password: true,
            description: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    const data = chats
      .map((c) => ({ id: c.id, members: c.members, lastMessage: c.messages[0] }))
      .sort((a, b) => (a.lastMessage.createdAt < b.lastMessage.createdAt ? 1 : -1));

    return data;
  }

  async findOneChat(id: number) {
    const chat = await this.prismaService.chat.findUnique({
      where: { id },
      include: {
        members: {
          omit: {
            password: true,
          },
        },
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat is not found');
    }

    const data = { ...chat, membersCount: chat.members.length };

    return data;
  }
}
