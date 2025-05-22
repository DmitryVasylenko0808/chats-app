import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { ChatsGateway } from './chats.gateway';
import { CreateChatDto } from './dto/create-chat.dto';
import { UserChatRooms } from './types/chat-room';
import { RefreshChatMember, RefreshMembersChatParams } from './types/refresh-members-chats-params';

@Injectable()
export class ChatsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly chatsGateway: ChatsGateway
  ) {}

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
      .sort((a, b) => (a.lastMessage?.createdAt < b.lastMessage?.createdAt ? 1 : -1));

    return data;
  }

  async findOneChatOrThrow(id: number) {
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
        members: true,
      },
    });

    await this.refreshMembersChats({ chatId: createdChat.id });

    return createdChat;
  }

  async deleteChat(id: number) {
    await this.findOneChatOrThrow(id);

    const deletedChat = await this.prismaService.chat.delete({
      where: { id },
      include: {
        members: true,
      },
    });

    await this.refreshMembersChats({ members: deletedChat.members });

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

  async refreshMembersChats(params: RefreshMembersChatParams) {
    let members: RefreshChatMember[];

    if ('chatId' in params) {
      const chat = await this.findOneChatOrThrow(params.chatId);
      members = chat.members;
    } else {
      members = params.members;
    }

    const membersIds = members.map((m) => m.id);

    const chats = await this.prismaService.chat.findMany({
      where: {
        members: {
          some: {
            id: {
              in: membersIds,
            },
          },
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

    const formattedChats = chats
      .map((c) => ({ id: c.id, members: c.members, lastMessage: c.messages[0] }))
      .sort((a, b) => (a.lastMessage?.createdAt < b.lastMessage?.createdAt ? 1 : -1));

    const chatsByMemberId: UserChatRooms = membersIds.reduce((acc, currId) => {
      const memberChats = formattedChats.filter((item) =>
        item.members.map((m) => m.id).includes(currId)
      );

      return { ...acc, [currId]: memberChats };
    }, {});

    this.chatsGateway.emitUpdateChats(chatsByMemberId);

    return chatsByMemberId;
  }
}
