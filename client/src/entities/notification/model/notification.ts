import { User } from '@/entities/user';

export type NotificationType = 'NEW_CHAT' | 'NEW_MESSAGE';
export type EntityType = 'CHAT' | 'MESSAGE';
export type Notification = {
  id: number;
  type: NotificationType;
  isRead: boolean;
  userId: number;
  createdAt: Date;
  data?: any;
  entityId?: number;
  entityType?: EntityType;
  user?: User;
  senderId?: number;
  sender?: User;
};
