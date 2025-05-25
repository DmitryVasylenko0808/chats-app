import { Message, User } from '@prisma/client';

export type ChatPreview = {
  id: number;
  members: User[];
  messages?: Message[];
};
