type User = {
  id: number;
  username: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
};

type Message = {
  id: number;
  chatId: number;
  senderId: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

type Chat = {
  id: number;
  members: User[];
  lastMessage?: Message;
};

export type GetChatsDto = Chat[];
