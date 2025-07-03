import { Reaction } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { IReactionsRepository } from './interfaces/reactions-repository.interface';

@Injectable()
export class ReactionsRepository implements IReactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(messageId: number, userId: number, emoji: string): Promise<Reaction | null> {
    return await this.prisma.reaction.findUnique({
      where: {
        userId_messageId: { messageId, userId },
        emoji,
      },
    });
  }

  async upsert(messageId: number, userId: number, emoji: string): Promise<Reaction> {
    return await this.prisma.reaction.upsert({
      where: {
        userId_messageId: { messageId, userId },
      },
      create: { userId, messageId, emoji },
      update: { emoji },
    });
  }

  async delete(messageId: number, userId: number, emoji: string): Promise<Reaction> {
    return await this.prisma.reaction.delete({
      where: {
        userId_messageId: { messageId, userId },
        emoji,
      },
    });
  }
}
