import { Notification } from '@/entities/notification';
import { Button } from '@/shared';

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { useDeleteNotificationById } from '../lib/hooks/use-delete-notification-by-id';

type DeleteNotificationButtonProps = { notification: Notification };
export const DeleteNotificationButton = ({
  notification,
}: Readonly<DeleteNotificationButtonProps>) => {
  const { mutateAsync: deleteNotification } = useDeleteNotificationById();

  const handleDeleteNotification = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification(notification.id);
  };

  return (
    <Button variant="text" onClick={handleDeleteNotification}>
      <AiOutlineClose size={18} />
    </Button>
  );
};
