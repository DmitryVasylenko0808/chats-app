import { PaginatinedDto } from '@/shared';

import { Notification } from '../model/notification';

export type GetNotificationsDto = PaginatinedDto<Notification>;
export type GetUnreadCountNotificationsDto = { count: number };
export type MarkAsReadNotificationDto = Notification;
export type DeleteAllNotificationsDto = { count: number };
export type DeleteNotificationByIdDto = Notification;
