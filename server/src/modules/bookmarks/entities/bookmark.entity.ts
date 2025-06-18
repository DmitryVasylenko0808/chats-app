import { Bookmark } from '@prisma/client';

import { MessageEntity } from '@/modules/messages/entities/message.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';

export class BookmarkEntity implements Bookmark {
  id: number;
  userId: number;
  messageId: number;
  createdAt: Date;

  user?: UserEntity;
  message?: MessageEntity;

  constructor(partial: Partial<BookmarkEntity>) {
    const { user, message, ...data } = partial;

    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }

    if (message) {
      this.message = new MessageEntity(message);
    }
  }
}
