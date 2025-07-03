import { Message } from '@prisma/client';

import { MessageWithRelations } from '../types/message-with-relations';

export type CreateMessageData = {
  chatId: number;
  senderId: number;
  text?: string;
  images?: string[];
  replyToId?: number;
  forwardedMessageId?: number;
};
export type UpdateMessageData = {
  text?: string;
  images?: string[];
  isPinned?: boolean;
};

export interface IMessagesRepository {
  findManyByChatId(chatId: number): Promise<MessageWithRelations[]>;
  findOneById(id: number): Promise<Message>;
  create(data: CreateMessageData): Promise<Message>;
  updateOne(data: UpdateMessageData, messageId: number, chatId?: number): Promise<Message>;
  updateManyByChatId(chatId: number, data: UpdateMessageData): Promise<{ count: number }>;
  delete(id: number): Promise<Message>;
}
