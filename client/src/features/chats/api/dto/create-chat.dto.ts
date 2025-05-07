type User = {
  id: number;
  username: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: string | null;
};

type Chat = {
  id: number;
  members: User[];
};

export type CreateChatDto = Chat;
