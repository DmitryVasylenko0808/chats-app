import { Reaction } from '@prisma/client';

export class ReactionEntity implements Reaction {
  id: number;
  createdAt: Date;
  emoji: string;
  userId: number;
  messageId: number;

  constructor(partial: Partial<ReactionEntity>) {
    Object.assign(this, partial);
  }
}
