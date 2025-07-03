import { $Enums, Notification } from '@prisma/client';

import { Type } from 'class-transformer';

import { UserResponseDto } from '@/modules/users/dto/responses';

import { JsonValue } from '.prisma/client/runtime/library';

export class NotificationResponseDto implements Notification {
  id: number;
  type: $Enums.NotificationType;
  isRead: boolean;
  entityId: number;
  entityType: $Enums.EntityType;
  data: JsonValue;
  createdAt: Date;
  userId: number;
  senderId: number;

  @Type(() => UserResponseDto)
  sender?: UserResponseDto;

  constructor(partial: Partial<NotificationResponseDto>) {
    Object.assign(this, partial);
  }
}
