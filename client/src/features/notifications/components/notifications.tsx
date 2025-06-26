import { useNavigate } from 'react-router';

import { useGetNotifications } from '../hooks';
import { NotificationsHeader } from './notifications-header';
import { NotificationsList } from './notifications-list';

export const Notifications = () => {
  const { data } = useGetNotifications({
    page: 1,
    limit: 10,
    sortDate: 'desc',
  });
  const navigate = useNavigate();

  const handleClickNotification = (entityPath?: string) => {
    if (entityPath) {
      navigate(entityPath);
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
