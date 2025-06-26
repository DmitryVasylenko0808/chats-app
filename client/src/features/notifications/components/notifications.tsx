import { Notification } from '@/entities';

import { useNavigate } from 'react-router';

import { useGetNotifications, useMarkNotification } from '../hooks';
import { NotificationsHeader } from './notifications-header';
import { NotificationsList } from './notifications-list';

export const Notifications = () => {
  const { data } = useGetNotifications({
    page: 1,
    limit: 10,
    sortDate: 'desc',
  });
  const { mutateAsync } = useMarkNotification();
  const navigate = useNavigate();

  const handleClickNotification = (notification: Notification, entityPath?: string) => {
    if (entityPath) {
      navigate(entityPath);
      mutateAsync(notification.id);
    }
  };

  return (
    <div>
      <NotificationsHeader />
      <div className="scrollbar-custom h-[calc(100vh-88px)] overflow-auto">
        <NotificationsList notifications={data?.data} onClickItem={handleClickNotification} />
      </div>
    </div>
  );
};
