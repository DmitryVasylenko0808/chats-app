import { Message } from './message';
import { User } from './user';

export type Chat = {
  id: number;
  members: User[];
  lastMessage?: Message;
};
