import { Message, Reaction, User } from '@prisma/client';

type MessageWithSender = Message & { sender: User };

export type MessageWithRelations = Message & {
  sender: User;
  replyToMessage: MessageWithSender | null;
  forwardedMessage: MessageWithSender | null;
  reactions: Reaction[];
};
