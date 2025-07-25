import { notificationsSocketUrl } from '@/config/contants';
import { Notification } from '@/entities';
import { useAuth } from '@/features/auth/hooks';
import { useAlerts } from '@/shared/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';

import { PropsWithChildren, useEffect, useRef } from 'react';

type NotificationsSocketContainerProps = PropsWithChildren;

export const NotificationsSocketContainer = ({
  children,
}: Readonly<NotificationsSocketContainerProps>) => {
  const { currentUser } = useAuth();
  const alerts = useAlerts();
  const queryClient = useQueryClient();
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    const handleGetNotification = (notification: Notification) => {
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] }).then(() =>
        alerts.notify({
          variant: 'info',
          title: 'New Notification',
          text: 'You have received a new notification',
        })
      );
    };

    if (currentUser?.id) {
      socket.current = io(notificationsSocketUrl, {
        query: {
          userId: currentUser.id,
        },
      });

      socket.current.on('notification:get', handleGetNotification);
    }

    return () => {
      socket.current?.off('notification:get', handleGetNotification);
      socket.current?.disconnect();
    };
  }, [currentUser]);

  return children;
};
