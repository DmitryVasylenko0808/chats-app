import { Message, User } from '@prisma/client';

export type ChatRoom = {
  id: number;
  members: User[];
  lastMessage: Message;
};

export type UserChatRooms = Record<string, ChatRoom[]>;
