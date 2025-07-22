import { Chat } from '@/entities';
import { SOCKET_URL, useAuth } from '@/shared';
import { useQueryClient } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';

import { PropsWithChildren, useEffect, useRef } from 'react';

export const SocketContainer = ({ children }: Readonly<PropsWithChildren>) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    const handleChatsUpdate = (data: Chat[]) => {
      queryClient.setQueryData(['chats'], data);
    };

    if (currentUser?.id) {
      socket.current = io(SOCKET_URL, {
        query: {
          userId: currentUser.id,
        },
      });

      socket.current.on('chats:update', handleChatsUpdate);
    }

    return () => {
      socket.current?.off('chats:update', handleChatsUpdate);
      socket.current?.disconnect();
    };
  }, [currentUser?.id]);

  return children;
};
