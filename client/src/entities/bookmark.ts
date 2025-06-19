import { User } from '@/entities';

import { Message } from './message';

export type Bookmark = {
  id: number;
  userId: number;
  messageId: number;
  createdAt: Date;
  user: User | null;
  message: Message;
};
