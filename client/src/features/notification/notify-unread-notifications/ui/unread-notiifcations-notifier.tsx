import { useAlerts } from '@/shared';

import { useEffect, useRef } from 'react';

import { useGetUnreadCountNotifications } from '../lib/hooks/use-get-unread-count-notifications';

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
