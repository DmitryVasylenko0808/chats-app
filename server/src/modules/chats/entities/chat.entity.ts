import { Chat } from '@prisma/client';

import { MessageEntity } from '@/modules/messages/entities/message.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';

export class ChatEntity implements Chat {
  id: number;
  members?: UserEntity[];
  lastMessage?: MessageEntity;

  constructor({ members, lastMessage, ...data }: Partial<ChatEntity>) {
    Object.assign(this, data);

    if (members) {
      this.members = members.map((m) => new UserEntity(m));
    }

    if (lastMessage) {
      this.lastMessage = new MessageEntity(lastMessage);
    }
  }
}
