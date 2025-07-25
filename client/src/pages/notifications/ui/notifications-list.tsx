import { Notification, NotificationBlock } from '@/entities/notification';
import { DeleteNotificationButton } from '@/features/notification/delete-notification';

import { ComponentProps } from 'react';

type NotificationsListProps = ComponentProps<'ul'> & {
  notifications?: Notification[];
  onClickItem?: (notification: Notification, entityPath?: string) => void;
  onDeleteItem?: (notification: Notification) => void;
};
export const NotificationsList = ({
  notifications = [],
  className,
  onClickItem,
  onDeleteItem,
  ...listProps
}: Readonly<NotificationsListProps>) => {
  return (
    <ul className={className} {...listProps}>
      {notifications.map((n) => (
        <li key={n.id}>
          <NotificationBlock
            notification={n}
            key={n.id}
            onClick={onClickItem}
            actionsSlot={<DeleteNotificationButton notification={n} />}
          />
        </li>
      ))}
    </ul>
  );
};
