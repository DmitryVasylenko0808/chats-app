import { Notification } from '@/entities';

import { useNavigate } from 'react-router';

import { useDeleteNotificationById, useGetNotifications, useMarkNotification } from '../hooks';
import { NotificationsHeader } from './notifications-header';
import { NotificationsList } from './notifications-list';

export const Notifications = () => {
  const { data } = useGetNotifications({
    page: 1,
    limit: 10,
    sortDate: 'desc',
  });
  const { mutateAsync: markNotification } = useMarkNotification();
  const { mutateAsync: deleteNotification } = useDeleteNotificationById();
  const navigate = useNavigate();

  const handleClickNotification = (notification: Notification, entityPath?: string) => {
    if (entityPath) {
      navigate(entityPath);
      markNotification(notification.id);
    }
  };

  const handleDeleteNotification = (notification: Notification) => {
    deleteNotification(notification.id);
  };

  return (
    <div>
      <NotificationsHeader />
      <div className="scrollbar-custom h-[calc(100vh-88px)] overflow-auto">
        <NotificationsList
          notifications={data?.data}
          onClickItem={handleClickNotification}
          onDeleteItem={handleDeleteNotification}
        />
      </div>
    </div>
  );
};
