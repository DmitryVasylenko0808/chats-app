import { Chat } from '@prisma/client';

import { Type } from 'class-transformer';

import { MessageEntity } from '@/modules/messages/entities/message.entity';
import { UserResponseDto } from '@/modules/users/dto/responses';

export class ChatEntity implements Chat {
  id: number;

  @Type(() => UserResponseDto)
  members?: UserResponseDto[];

  lastMessage?: MessageEntity;

  constructor({ lastMessage, ...data }: Partial<ChatEntity>) {
    Object.assign(this, data);

    if (lastMessage) {
      this.lastMessage = new MessageEntity(lastMessage);
    }
  }
}
