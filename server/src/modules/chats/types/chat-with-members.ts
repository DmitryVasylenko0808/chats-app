import { Chat, User } from '@prisma/client';

export type ChatWithMembers = Chat & { members: User[] };
