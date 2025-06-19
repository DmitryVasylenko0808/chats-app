import { Message } from '@/entities/message';

export type UpdatedMessages = {
  chatId: number;
  messages: Message[];
};
