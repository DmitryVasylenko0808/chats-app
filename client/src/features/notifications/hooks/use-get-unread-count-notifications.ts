import { getUnreadCountNotificationsDto } from '@/entities/notification';
import { useQuery } from '@tanstack/react-query';

export const useGetUnreadCountNotifications = () => {
  return useQuery({
    queryKey: ['notifications-unread-count'],
    queryFn: getUnreadCountNotificationsDto,
  });
};
