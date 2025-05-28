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

export type MessageWithSender = Message & { sender: Sender | null };

export type UpdatedMessages = {
  chatId: number;
  messages: MessageWithSender[];
};

export type Chat = {
  id: number;
  members: User[];
  lastMessage?: Message;
};
