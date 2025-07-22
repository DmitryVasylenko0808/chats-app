import { Message } from '@/entities/message';
import { User } from '@/entities/user';

export type Chat = {
  id: number;
  members: User[];
  lastMessage?: Message;
};
