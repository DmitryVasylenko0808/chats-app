import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';

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

  async createChat(dto: CreateChatDto) {
    if (dto.membersIds.length !== 2) {
      throw new BadRequestException('Chat must contain only 2 members');
    }

    const chat = await this.checkChatExists(dto.membersIds);

    if (chat) {
      return chat;
    }

    const createdChat = await this.prismaService.chat.create({
      data: {
        members: {
          connect: dto.membersIds.map((m) => ({ id: m })),
        },
      },
      include: {
        members: {
          omit: {
            password: true,
            description: true,
          },
        },
      },
    });

    return createdChat;
  }

  async deleteChat(id: number) {
    const chat = await this.prismaService.chat.findUnique({
      where: { id },
    });

    if (!chat) {
      throw new NotFoundException('Chat is not found');
    }

    await this.prismaService.chat.delete({
      where: { id },
    });

    return { message: 'Chat is deleted' };
  }

  private async checkChatExists(membersIds: number[]) {
    const [firstUserId, secondUserId] = membersIds;

    const chat = await this.prismaService.chat.findFirst({
      where: {
        AND: [
          {
            members: {
              some: { id: firstUserId },
            },
          },
          {
            members: {
              some: { id: secondUserId },
            },
          },
        ],
      },
      include: {
        members: {
          omit: {
            password: true,
            description: true,
          },
        },
      },
    });

    return chat;
  }
}
