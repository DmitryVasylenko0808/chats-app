import { User } from '@prisma/client';

export type RefreshChatMember = User | Omit<User, 'password'>;
export type RefreshMembersChatParams = { members: RefreshChatMember[] } | { chatId: number };
