import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getNotifications, GetNotificationsParams } from '../../api';

export const useGetNotifications = (params: GetNotificationsParams) => {
  return useQuery({
    queryKey: ['notifications', { ...params }],
    queryFn: () => getNotifications(params),
    placeholderData: keepPreviousData,
  });
};
