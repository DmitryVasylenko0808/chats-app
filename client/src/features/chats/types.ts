import { User } from '../users/types';

export type Reaction = {
  id: number;
  createdAt: Date;
  emoji: string;
  userId: number;
  messageId: number;
};

export type Message = {
  id: number;
  chatId: number;
  senderId: number | null;
  text: string;
  images: string[];
  isPinned: boolean;
  replyToId: number | null;
  forwardedMessageId: number | null;
  createdAt: Date;
  updatedAt: Date;
  sender?: User | null;
  replyToMessage?: Message;
  forwardedMessage?: Message;
  reactionsByEmoji?: Record<string, Reaction>;
  reactionsByEmojiCount?: Record<string, number>;
};

export type UpdatedMessages = {
  chatId: number;
  messages: Message[];
};

export type Chat = {
  id: number;
  members: User[];
  lastMessage?: Message;
};
