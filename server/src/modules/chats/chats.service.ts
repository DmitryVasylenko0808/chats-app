import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { NotificationsService } from '@/modules/notifications/notifications.service';

import { ChatsRealtimeService } from './chats-realtime.service';
import { ChatsRepository } from './chats-repository';
import { ChatsUtils } from './chats.utils';
import { CreateChatRequestDto } from './dto/requests';

@Injectable()
export class ChatsService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly chatsRealtimeService: ChatsRealtimeService,
    private readonly chatsUtils: ChatsUtils,
    private readonly notificationsService: NotificationsService
  ) {}

  async findChats(userId: number) {
    const chats = await this.chatsRepository.findManyByUserId(userId);

    return this.chatsUtils.sortChatsByLastMessage(chats);
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

    await this.chatsRealtimeService.refreshMembersChats({ chatId: createdChat.id });

    const creator = createdChat.members.find((m) => m.id === creatorId);
    const participants = createdChat.members.filter((m) => m.id !== creatorId);
    await this.notificationsService.notifyNewChat(participants, creator, createdChat);

    return createdChat;
  }

  async deleteChat(id: number) {
    await this.findOneChatOrThrow(id);

    const deletedChat = await this.chatsRepository.delete(id);

    await this.chatsRealtimeService.refreshMembersChats({ members: deletedChat.members });

    return deletedChat;
  }
}
