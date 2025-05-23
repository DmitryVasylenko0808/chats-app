export type GetUserDto = {
  id: number;
  username: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string | null;
  avatar?: string | null;
};
