import { Message } from '@/entities/message';
import { User } from '@/entities/user';

export type Bookmark = {
  id: number;
  userId: number;
  messageId: number;
  createdAt: Date;
  user: User | null;
  message: Message;
};
