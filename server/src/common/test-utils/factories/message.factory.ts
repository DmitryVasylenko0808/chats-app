import { Message, User } from '@prisma/client';

export const createMockMessage = (
  id: number,
  chatId: number,
  senderId: number,
  sender?: User,
  overrides?: Partial<Message>
) => ({
  id,
  chatId,
  senderId,
  replyToId: null,
  forwardedMessageId: null,
  text: `text-${id}`,
  images: [],
  isPinned: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  sender,
  ...overrides,
});
