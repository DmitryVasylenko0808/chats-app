import { EntityType, Notification, NotificationType } from '@/entities/notification';
import { cn, Typograpghy } from '@/shared';

type NotificationBlockProps = {
  notification: Notification;
  actionsSlot?: React.ReactNode;
  onClick?: (notification: Notification, entityPath?: string) => void;
};

export const NotificationBlock = ({
  notification,
  actionsSlot,
  onClick,
}: Readonly<NotificationBlockProps>) => {
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

  return (
    <div
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
        {actionsSlot}
      </div>
    </div>
  );
};
