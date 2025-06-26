import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';
import { EntityType } from '@/entities';

import { GetNotificationsDto } from './dto';

type GetNotificationsQueryOptions = {
  page: number;
  limit: number;
  sortDate?: 'asc' | 'desc';
  isRead?: boolean;
  entityType?: EntityType;
};

export type GetNotificationsParams = GetNotificationsQueryOptions;

export const getNotifications = async (params: GetNotificationsParams) => {
  const { page, limit, sortDate, isRead, entityType } = params;

  const response = await axiosInstance.get<GetNotificationsDto>(`${apiUrl}/notifications`, {
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

export const markAsReadNotification = async (id?: number) => {
  const response = await axiosInstance.patch(`${apiUrl}/notifications/${id}`);

  return response.data;
};
