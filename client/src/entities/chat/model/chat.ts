import { User } from '@/entities/user';

import { Message } from '../../message';

export type Chat = {
  id: number;
  members: User[];
  lastMessage?: Message;
};
