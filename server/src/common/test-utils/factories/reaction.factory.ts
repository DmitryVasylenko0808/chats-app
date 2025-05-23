import { Reaction } from '@prisma/client';

export const createMockReaction = (
  id: number,
  messageId: number,
  userId: number,
  overrides?: Partial<Reaction>
) => ({
  id,
  messageId,
  userId,
  emoji: 'emoji-reaction',
  createdAt: new Date(),
  ...overrides,
});
