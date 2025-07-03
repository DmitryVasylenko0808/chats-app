import { Reaction } from '@prisma/client';

export interface IReactionsRepository {
  findOne(messageId: number, userId: number, emoji: string): Promise<Reaction | null>;
  upsert(messageId: number, userId: number, emoji: string): Promise<Reaction>;
  delete(messageId: number, userId: number, emoji: string): Promise<Reaction>;
}
