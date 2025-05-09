import { User } from '../users/types';

type Sender = {
  id?: number;
  username?: string;
  email?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  avatar?: string;
};

export type Message = {
  id: number;
  chatId: number;
  senderId: number | null;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MessageWithSender = {
  id: number;
  chatId: number;
  senderId: number | null;
  sender: Sender | null;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Chat = {
  id: number;
  members: User[];
  lastMessage?: Message;
};
