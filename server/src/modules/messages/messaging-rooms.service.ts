import { Injectable } from '@nestjs/common';

import { ChatsRepository } from '../chats/chats-repository';
import { MessagesRepository } from './messages-repository';
import { MessagesGateway } from './messages.gateway';

@Injectable()
export class MessagingRoomsService {
  constructor(
    private readonly chatsRepository: ChatsRepository,
    private readonly messagesRepository: MessagesRepository,
    private readonly messagesGateway: MessagesGateway
  ) {}

  async findAbsentMembers(chatId: number) {
    const chat = await this.chatsRepository.findOneById(chatId);

    return chat.members.filter((m) => !this.messagesGateway.isUserInChat(m.id, chatId));
  }

  async refreshChatMessages(chatId: number) {
    const messages = await this.messagesRepository.findManyByChatId(chatId);

    this.messagesGateway.emitUpdateMessages(chatId, messages);
  }
}
