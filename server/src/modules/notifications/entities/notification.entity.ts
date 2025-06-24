import { $Enums, Notification } from '@prisma/client';

import { UserEntity } from '@/modules/users/entities/user.entity';

import { JsonValue } from '.prisma/client/runtime/library';

export class NotificationEntity implements Notification {
  id: number;
  type: $Enums.NotificationType;
  isRead: boolean;
  entityId: number;
  entityType: $Enums.EntityType;
  data: JsonValue;
  createdAt: Date;
  userId: number;
  senderId: number;
  sender?: UserEntity;

  constructor(partial: Partial<NotificationEntity>) {
    const { sender, ...data } = partial;

    Object.assign(this, data);

    if (sender) {
      this.sender = new UserEntity(sender);
    }
  }
}
