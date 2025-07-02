import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { NotificationsService } from '@/modules/notifications/notifications.service';

import { ChatsRepository } from './chats-repository';
import { ChatsGateway } from './chats.gateway';
import { CreateChatRequestDto } from './dto/requests';
import { ChatPreview, RefreshChatMember, RefreshMembersChatParams, UserChatRooms } from './types';

@Injectable()
export class ChatsService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly notificationsService: NotificationsService,
    private readonly chatsGateway: ChatsGateway
  ) {}

  async findChats(userId: number) {
    const chats = await this.chatsRepository.findManyByUserId(userId);

    return this.sortChatsByLastMessage(chats);
  }

  async findOneChatOrThrow(id: number) {
    const chat = await this.chatsRepository.findOneById(id);

    if (!chat) {
      throw new NotFoundException('Chat is not found');
    }

    return chat;
  }

  async createChat(creatorId: number, dto: CreateChatRequestDto) {
    if (dto.membersIds.length !== 2) {
      throw new BadRequestException('Chat must contain only 2 members');
    }

    const chat = await this.chatsRepository.findExistingChatBetweenUsers(dto.membersIds);

    if (chat) {
      return chat;
    }

    const createdChat = await this.chatsRepository.create(dto);

    await this.refreshMembersChats({ chatId: createdChat.id });

    const creator = createdChat.members.find((m) => m.id === creatorId);
    const participants = createdChat.members.filter((m) => m.id !== creatorId);
    await this.notificationsService.notifyNewChat(participants, creator, createdChat);

    return createdChat;
  }

  async deleteChat(id: number) {
    await this.findOneChatOrThrow(id);

    const deletedChat = await this.chatsRepository.delete(id);

    await this.refreshMembersChats({ members: deletedChat.members });

    return deletedChat;
  }

  async findAbsentChatMembers(chatId: number) {
    const chat = await this.findOneChatOrThrow(chatId);

    return chat.members.filter((m) => !this.chatsGateway.isUserInChat(m.id, chatId));
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

    const chats = await this.chatsRepository.findChatsByMemberIds(membersIds);
    const sortedChats = this.sortChatsByLastMessage(chats);
    const chatsByMemberId = this.groupChatsByMember(membersIds, sortedChats);

    this.chatsGateway.emitUpdateChats(chatsByMemberId);
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
}
