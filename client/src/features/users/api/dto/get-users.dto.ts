type User = {
  id: number;
  username: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string | null;
};

export type GetUsersDto = User[];
