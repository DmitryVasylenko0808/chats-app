import { EntityType, Notification, NotificationType } from '@prisma/client';

export const createMockNotification = (
  id: number,
  type: NotificationType,
  overrides?: Partial<Notification>
): Notification => ({
  id,
  type,
  isRead: false,
  entityId: 1,
  entityType: 'MESSAGE',
  data: {},
  userId: 1,
  senderId: 1,
  createdAt: new Date(),
  ...overrides,
});
