import { User } from '../users/types';

export type Message = {
  id: number;
  chatId: number;
  senderId: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Chat = {
  id: number;
  members: User[];
  lastMessage?: Message;
};
