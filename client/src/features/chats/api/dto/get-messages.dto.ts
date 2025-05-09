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
  senderId: number | null;
  sender: Sender | null;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetMessagesDto = Message[];
