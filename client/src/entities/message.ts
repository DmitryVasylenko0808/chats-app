import { Reaction, User } from '@/entities';

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
  reactionsByEmoji?: Record<string, Reaction[]>;
  reactionsByEmojiCount?: Record<string, number>;
};
