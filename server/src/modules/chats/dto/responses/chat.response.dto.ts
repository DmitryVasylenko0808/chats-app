import { Chat } from '@prisma/client';

import { Type } from 'class-transformer';

import { UserResponseDto } from '@/modules/users/dto/responses';

export class ChatResponseDto implements Chat {
  id: number;

  @Type(() => UserResponseDto)
  members: UserResponseDto[];

  constructor(partial: Partial<ChatResponseDto>) {
    Object.assign(this, partial);
  }
}
