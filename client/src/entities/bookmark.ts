import { Message } from './message';
import { User } from './user';

export type Bookmark = {
  id: number;
  userId: number;
  messageId: number;
  createdAt: Date;
  user: User | null;
  message: Message;
};
