import { Injectable, NotFoundException } from '@nestjs/common';

import { MessagesService } from '../messages/messages.service';
import { ReactionsRepository } from './reactions-repository';

@Injectable()
export class ReactionsService {
  constructor(
    private readonly reactionsRepository: ReactionsRepository,
    private readonly messagesService: MessagesService
  ) {}

  async addReaction(messageId: number, userId: number, emoji: string) {
    const message = await this.messagesService.findMessageByIdOrThrow(messageId);

    const reaction = await this.reactionsRepository.upsert(messageId, userId, emoji);

    await this.messagesService.refreshChatMessages(message.chatId);

    return reaction;
  }

  async deleteReaction(messageId: number, userId: number, emoji: string) {
    const message = await this.messagesService.findMessageByIdOrThrow(messageId);
    await this.findOneReactionOrThrow(messageId, userId, emoji);

    const deletedReaction = await this.reactionsRepository.delete(messageId, userId, emoji);

    await this.messagesService.refreshChatMessages(message.chatId);

    return deletedReaction;
  }

  private async findOneReactionOrThrow(messageId: number, userId: number, emoji: string) {
    const reaction = await this.reactionsRepository.findOne(messageId, userId, emoji);

    if (!reaction) {
      throw new NotFoundException('Cannot delete reaction');
    }

    return reaction;
  }
}
