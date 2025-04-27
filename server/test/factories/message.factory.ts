import { Message, User } from '@prisma/client';

export const createMockMessage = (id: number, chatId: number, senderId: number, sender?: User) => ({
  id,
  chatId,
  senderId,
  text: `text-${id}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  sender,
});
