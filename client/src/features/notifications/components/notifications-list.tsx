import { Notification } from '@/entities';

import { NotificationItem } from './notification-item';

type NotificationsListProps = {
  notifications?: Notification[];
  onClickItem?: (entityPath?: string) => void;
  onDeleteItem?: (notification: Notification) => void;
};
export const NotificationsList = ({
  notifications = [],
  onClickItem,
  onDeleteItem,
}: Readonly<NotificationsListProps>) => {
  return (
    <ul className="">
      {notifications.map((n) => (
        <NotificationItem
          notification={n}
          key={n.id}
          onClick={onClickItem}
          onDelete={() => onDeleteItem?.(n)}
        />
      ))}
    </ul>
  );
};
