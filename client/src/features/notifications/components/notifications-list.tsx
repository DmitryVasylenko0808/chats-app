import { Notification } from '@/entities';

import { ComponentProps } from 'react';

import { NotificationItem } from './notification-item';

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
