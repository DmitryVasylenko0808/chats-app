import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { NotificationsService } from '../notifications/notifications.service';
import { ChatsGateway } from './chats.gateway';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatPreview } from './types/chat-preview';
import { UserChatRooms } from './types/chat-room';
import { RefreshChatMember, RefreshMembersChatParams } from './types/refresh-members-chats-params';

@Injectable()
export class ChatsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationsService: NotificationsService,
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
        members: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    return this.sortChatsByLastMessage(chats);
  }

  async findOneChatOrThrow(id: number) {
    const chat = await this.prismaService.chat.findUnique({
      where: { id },
      include: { members: true },
    });

    if (!chat) {
      throw new NotFoundException('Chat is not found');
    }

    return chat;
  }

  async createChat(creatorId: number, dto: CreateChatDto) {
    if (dto.membersIds.length !== 2) {
      throw new BadRequestException('Chat must contain only 2 members');
    }

    const chat = await this.findExistingChatBetweenUsers(dto.membersIds);

    if (chat) {
      return chat;
    }

    const createdChat = await this.prismaService.chat.create({
      data: {
        members: {
          connect: dto.membersIds.map((m) => ({ id: m })),
        },
      },
      include: { members: true },
    });

    await this.refreshMembersChats({ chatId: createdChat.id });

    const creator = createdChat.members.find((m) => m.id === creatorId);
    const participants = createdChat.members.filter((m) => m.id !== creatorId);
    await this.notificationsService.notifyNewChat(participants, creator, createdChat);

    return createdChat;
  }

  async deleteChat(id: number) {
    await this.findOneChatOrThrow(id);

    const deletedChat = await this.prismaService.chat.delete({
      where: { id },
      include: { members: true },
    });

    await this.refreshMembersChats({ members: deletedChat.members });

    return deletedChat;
  }

  async findAbsentChatMembers(chatId: number) {
    const chat = await this.findOneChatOrThrow(chatId);

    return chat.members.filter((m) => !this.chatsGateway.isUserInChat(m.id, chatId));
  }

  private async findChatsByMembers(membersIds: number[]) {
    return await this.prismaService.chat.findMany({
      where: {
        members: {
          some: {
            id: { in: membersIds },
          },
        },
      },
      include: {
        members: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  private async findExistingChatBetweenUsers(membersIds: number[]) {
    const [firstUserId, secondUserId] = membersIds;

    return await this.prismaService.chat.findFirst({
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
      include: { members: true },
    });
  }

  private sortChatsByLastMessage(chats: ChatPreview[]) {
    return chats
      .map((c) => ({ id: c.id, members: c.members, lastMessage: c.messages[0] }))
      .sort((a, b) => (a.lastMessage?.createdAt < b.lastMessage?.createdAt ? 1 : -1));
  }

  private groupChatsByMember(membersIds: number[], chats: ChatPreview[]): UserChatRooms {
    return membersIds.reduce((acc, currId) => {
      const memberChats = chats.filter((item) => item.members.map((m) => m.id).includes(currId));

      return { ...acc, [currId]: memberChats };
    }, {});
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

    const chats = await this.findChatsByMembers(membersIds);
    const sortedChats = this.sortChatsByLastMessage(chats);
    const chatsByMemberId = this.groupChatsByMember(membersIds, sortedChats);

    this.chatsGateway.emitUpdateChats(chatsByMemberId);
  }
}
