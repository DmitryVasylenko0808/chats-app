import { Bookmark } from '@prisma/client';

import { Type } from 'class-transformer';

import { MessageEntity } from '@/modules/messages/entities/message.entity';
import { UserResponseDto } from '@/modules/users/dto/responses';

export class BookmarkEntity implements Bookmark {
  id: number;
  userId: number;
  messageId: number;
  createdAt: Date;

  @Type(() => UserResponseDto)
  user?: UserResponseDto;
  message?: MessageEntity;

  constructor(partial: Partial<BookmarkEntity>) {
    const { message, ...data } = partial;

    Object.assign(this, data);

    if (message) {
      this.message = new MessageEntity(message);
    }
  }
}
