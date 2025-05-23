import { Injectable, NotFoundException } from '@nestjs/common';

import { MessagesService } from '../messages/messages.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReactionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly messagesService: MessagesService
  ) {}

  async addReaction(messageId: number, userId: number, emoji: string) {
    const message = await this.messagesService.findMessageByIdOrThrow(messageId);

    const reaction = await this.prismaService.reaction.upsert({
      where: {
        userId_messageId: {
          messageId,
          userId,
        },
      },
      create: {
        userId,
        messageId,
        emoji,
      },
      update: {
        emoji,
      },
    });

    await this.messagesService.refreshChatMessages(message.chatId);

    return reaction;
  }

  async deleteReaction(messageId: number, userId: number, emoji: string) {
    const message = await this.messagesService.findMessageByIdOrThrow(messageId);

    await this.findOneReactionOrThrow(messageId, userId, emoji);

    const deletedReaction = await this.prismaService.reaction.delete({
      where: {
        userId_messageId: { messageId, userId },
        emoji,
      },
    });

    await this.messagesService.refreshChatMessages(message.chatId);

    return deletedReaction;
  }

  private async findOneReactionOrThrow(messageId: number, userId: number, emoji: string) {
    const reaction = await this.prismaService.reaction.findUnique({
      where: {
        userId_messageId: { messageId, userId },
        emoji,
      },
    });

    if (!reaction) {
      throw new NotFoundException('Cannot delete reaction');
    }

    return reaction;
  }
}
