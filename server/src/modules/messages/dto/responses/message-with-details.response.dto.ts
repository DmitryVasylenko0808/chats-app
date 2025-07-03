import { Message } from '@prisma/client';

import { Exclude, Transform, Type } from 'class-transformer';

import { ReactionResponseDto } from '@/modules/reactions/dto/responses';
import { UserResponseDto } from '@/modules/users/dto/responses';

export class MessageWithDetailsResponseDto implements Message {
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

  @Type(() => MessageWithDetailsResponseDto)
  replyToMessage?: MessageWithDetailsResponseDto;

  @Type(() => MessageWithDetailsResponseDto)
  forwardedMessage?: MessageWithDetailsResponseDto;

  @Exclude()
  @Type(() => ReactionResponseDto)
  reactions?: ReactionResponseDto[];

  reactionsByEmoji?: Record<string, ReactionResponseDto[]>;
  reactionsCountByEmoji?: Record<string, number>;

  constructor(partial: Partial<MessageWithDetailsResponseDto>) {
    const { reactions, ...data } = partial;

    Object.assign(this, data);

    if (reactions) {
      this.reactions = reactions.map((r) => new ReactionResponseDto(r));
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
