import { Message } from '@prisma/client';

import { Exclude } from 'class-transformer';

import { ReactionEntity } from '@/modules/reactions/entities/reaction.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';

export class MessageEntity implements Message {
  id: number;
  senderId: number;
  chatId: number;
  text: string;
  images: string[];
  isPinned: boolean;
  replyToId: number;
  forwardedMessageId: number;
  createdAt: Date;
  updatedAt: Date;

  sender?: UserEntity;
  replyToMessage?: MessageEntity;
  forwardedMessage?: MessageEntity;

  @Exclude()
  reactions?: ReactionEntity[];

  reactionsByEmoji?: Record<string, ReactionEntity[]>;
  reactionsCountByEmoji?: Record<string, number>;

  constructor(partial: Partial<MessageEntity>) {
    const { sender, replyToMessage, forwardedMessage, reactions, ...data } = partial;

    Object.assign(this, data);

    if (sender) {
      this.sender = new UserEntity(sender);
    }

    if (replyToMessage) {
      this.replyToMessage = new MessageEntity(replyToMessage);
    }

    if (forwardedMessage) {
      this.forwardedMessage = new MessageEntity(forwardedMessage);
    }

    if (reactions) {
      this.reactions = reactions.map((r) => new ReactionEntity(r));
      this.reactionsByEmoji = reactions.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.emoji]: acc[curr.emoji] ? [...acc[curr.emoji], curr] : [curr],
        }),
        {}
      );
      this.reactionsCountByEmoji = reactions.reduce(
        (acc, curr) => ({ ...acc, [curr.emoji]: acc[curr.emoji] ? acc[curr.emoji]++ : 1 }),
        {}
      );
    }
  }
}
