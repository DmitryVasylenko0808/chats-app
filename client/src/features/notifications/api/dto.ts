import { Notification } from '@/entities';
import { PaginatinedDto } from '@/shared/types';

export type GetNotificationsDto = PaginatinedDto<Notification>;
export type MarkAsReadNotificationDto = Notification;
export type DeleteAllNotificationsDto = { count: number };
export type DeleteNotificationByIdDto = Notification;
