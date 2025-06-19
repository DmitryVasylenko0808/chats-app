import { Message } from '../chats/types';
// Fix: Circular dependency from ../users/*
import { User } from '../users/types';

export type Bookmark = {
  id: number;
  userId: number;
  messageId: number;
  createdAt: Date;
  user: User | null;
  message: Message;
};
