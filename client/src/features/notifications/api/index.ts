import { EntityType } from '@/entities';
import { API_URL, apiClient } from '@/shared';

import {
  DeleteAllNotificationsDto,
  DeleteNotificationByIdDto,
  GetNotificationsDto,
  GetUnreadCountNotificationsDto,
  MarkAsReadNotificationDto,
} from './dto';

type GetNotificationsQueryOptions = {
  page: number;
  limit: number;
  sortDate?: string;
  isRead?: boolean;
  entityType?: EntityType;
};

export type GetNotificationsParams = GetNotificationsQueryOptions;

export const getNotifications = async (params: GetNotificationsParams) => {
  const { page, limit, sortDate, isRead, entityType } = params;

  const response = await apiClient.get<GetNotificationsDto>(`${API_URL}/notifications`, {
    params: {
      page,
      limit,
      sort_date: sortDate,
      is_read: isRead,
      entity_type: entityType,
    },
  });

  return response.data;
};

export const getUnreadCountNotificationsDto = async () => {
  const response = await apiClient.get<GetUnreadCountNotificationsDto>(
    `${API_URL}/notifications/unread-count`
  );

  return response.data;
};

export const markAsReadNotification = async (id?: number) => {
  const response = await apiClient.patch<MarkAsReadNotificationDto>(
    `${API_URL}/notifications/${id}`
  );

  return response.data;
};

export const deleteAllNotifications = async () => {
  const response = await apiClient.delete<DeleteAllNotificationsDto>(`${API_URL}/notifications`);

  return response.data;
};

export const deleteNotificationById = async (id?: number) => {
  const response = await apiClient.delete<DeleteNotificationByIdDto>(
    `${API_URL}/notifications/${id}`
  );

  return response.data;
};
