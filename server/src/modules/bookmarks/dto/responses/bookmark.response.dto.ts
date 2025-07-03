import { Bookmark } from '@prisma/client';

import { Type } from 'class-transformer';

import { MessageWithDetailsResponseDto } from '@/modules/messages/dto/responses';
import { UserResponseDto } from '@/modules/users/dto/responses';

export class BookmarkResponseDto implements Bookmark {
  id: number;
  userId: number;
  messageId: number;
  createdAt: Date;

  @Type(() => UserResponseDto)
  user?: UserResponseDto;

  @Type(() => MessageWithDetailsResponseDto)
  message?: MessageWithDetailsResponseDto;

  constructor(partial: Partial<BookmarkResponseDto>) {
    Object.assign(this, partial);
  }
}
