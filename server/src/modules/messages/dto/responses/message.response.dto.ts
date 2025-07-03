import { Message } from '@prisma/client';

import { Transform } from 'class-transformer';

export class MessageResponseDto implements Message {
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

  constructor(partial: Partial<MessageResponseDto>) {
    Object.assign(this, partial);
  }
}
