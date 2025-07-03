import { $Enums, EntityType, Notification, NotificationType, User } from '@prisma/client';

import { NotificationQueryRequestDto } from '../dto/requests';

export type NotificationWithSender = Notification & { sender: User | null };

export type NotificationsCountFilter = {
  userId?: number;
  isRead?: boolean;
  entityType?: $Enums.EntityType;
};
export type CreateNotificationData = {
  type: NotificationType;
  userId: number;
  senderId?: number;
  entityId?: number;
  entityType?: EntityType;
  data?: any;
};
export type UpdateNotificationData = Partial<Omit<Notification, 'id'>>;

export interface INotificationsRepository {
  findManyByUserId(
    userId: number,
    queryOptions?: NotificationQueryRequestDto
  ): Promise<NotificationWithSender[]>;
  createManyAndReturn(data: CreateNotificationData[]): Promise<NotificationWithSender[]>;
  updateOneById(id: number, data: UpdateNotificationData): Promise<Notification>;
  deleteById(id: number): Promise<Notification>;
  deleteManyByUserId(userId: number): Promise<{ count: number }>;
  count(filter: NotificationsCountFilter): Promise<number>;
}
