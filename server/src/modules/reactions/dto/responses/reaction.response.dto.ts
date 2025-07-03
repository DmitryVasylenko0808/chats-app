import { Reaction } from '@prisma/client';

export class ReactionResponseDto implements Reaction {
  id: number;
  createdAt: Date;
  emoji: string;
  userId: number;
  messageId: number;

  constructor(partial: Partial<ReactionResponseDto>) {
    Object.assign(this, partial);
  }
}
