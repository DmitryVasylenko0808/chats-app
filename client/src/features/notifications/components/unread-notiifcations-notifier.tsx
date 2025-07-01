import { useAlerts } from '@/shared/hooks';

import { useEffect, useRef } from 'react';

import { useGetUnreadCountNotifications } from '../hooks';

export const UnreadNotificationsNotifier = () => {
  const { data } = useGetUnreadCountNotifications();
  const alerts = useAlerts();
  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    if (data?.count && !hasNotifiedRef.current) {
      alerts.notify({
        variant: 'info',
        title: 'Notifications',
        text: `You have ${data.count} unread notifications`,
      });

      hasNotifiedRef.current = true;
    }
  }, [data]);

  return null;
};
