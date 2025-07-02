import { Message } from '@prisma/client';

import { Exclude, Transform, Type } from 'class-transformer';

import { ReactionEntity } from '@/modules/reactions/entities/reaction.entity';
import { UserResponseDto } from '@/modules/users/dto/responses';

export class MessageEntity implements Message {
  id: number;
  senderId: number;
  chatId: number;
  text: string;

  @Transform(({ value }) => value?.map((v) => `${process.env.SERVER_UPLOADS_URL}/${v}`))
  images: string[];

  isPinned: boolean;
  replyToId: number;
  forwardedMessageId: number;
  createdAt: Date;
  updatedAt: Date;

  @Type(() => UserResponseDto)
  sender?: UserResponseDto;
  replyToMessage?: MessageEntity;
  forwardedMessage?: MessageEntity;

  @Exclude()
  reactions?: ReactionEntity[];

  reactionsByEmoji?: Record<string, ReactionEntity[]>;
  reactionsCountByEmoji?: Record<string, number>;

  constructor(partial: Partial<MessageEntity>) {
    const { replyToMessage, forwardedMessage, reactions, ...data } = partial;

    Object.assign(this, data);

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
