import { Type } from 'class-transformer';

import { MessageResponseDto } from '@/modules/messages/dto/responses';
import { UserResponseDto } from '@/modules/users/dto/responses';

export class GetChatsResponseDto {
  id: number;

  @Type(() => UserResponseDto)
  members?: UserResponseDto[];

  @Type(() => MessageResponseDto)
  lastMessage?: MessageResponseDto;

  constructor(partial: Partial<GetChatsResponseDto>) {
    Object.assign(this, partial);
  }
}
