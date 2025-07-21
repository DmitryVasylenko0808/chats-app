import { EntityType, Notification, NotificationType } from '@/entities';
import { Button, cn, Typograpghy } from '@/shared';

import { AiOutlineClose } from 'react-icons/ai';

type NotificationItemProps = {
  notification: Notification;
  onClick?: (notification: Notification, entityPath?: string) => void;
  onDelete?: () => void;
};

export const NotificationItem = ({
  notification,
  onClick,
  onDelete,
}: Readonly<NotificationItemProps>) => {
  const typeContent: Record<NotificationType, string> = {
    NEW_CHAT: `Created chat with you`,
    NEW_MESSAGE: `Sent message`,
  };
  const entityPath: Record<EntityType, string> = {
    CHAT: `/chats/${notification.entityId}`,
    MESSAGE: `/chats/${notification.data?.chatId}`,
  };

  const handleClick = () => {
    const path = notification.entityType ? entityPath[notification.entityType] : undefined;

    onClick?.(notification, path);
  };

  const handleClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <li
      className={cn(
        'hover:bg-secondary-200 dark:hover:bg-dark-300 block cursor-pointer px-6 py-4 duration-100',
        {
          'opacity-30': notification.isRead,
        }
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        <img
          src={notification.sender?.avatar}
          alt="user-avatar"
          className="h-10 w-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <Typograpghy tagVariant="h4">{notification.sender?.name}</Typograpghy>
            <Typograpghy className="text-typography-200 dark:text-typography-100 text-xs">
              {new Date(notification.createdAt).toLocaleString()}
            </Typograpghy>
          </div>
          <Typograpghy>{typeContent[notification.type]}</Typograpghy>
        </div>
        <Button variant="text" onClick={handleClickDelete}>
          <AiOutlineClose size={18} />
        </Button>
      </div>
    </li>
  );
};
