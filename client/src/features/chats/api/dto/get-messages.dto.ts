type Sender = {
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
  sender: Sender;
};

export type GetMessagesDto = Message[];
