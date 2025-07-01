import { useQuery } from '@tanstack/react-query';

import { getUnreadCountNotificationsDto } from '../api';

export const useGetUnreadCountNotifications = () => {
  return useQuery({
    queryKey: ['notifications-unread-count'],
    queryFn: getUnreadCountNotificationsDto,
  });
};
