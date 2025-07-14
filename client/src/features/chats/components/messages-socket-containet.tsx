import { socketMessagesUrl } from '@/config/contants';
import { useAuth } from '@/features/auth/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import { UpdatedMessages } from '../types';

export const MessagesSocketContainer = ({ children }: Readonly<PropsWithChildren>) => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const socket = useRef<Socket | null>(null);

  const chatId = Number(id);

  useEffect(() => {
    const handleMessagesUpdate = (data: UpdatedMessages) => {
      queryClient.setQueryData(['messages', data.chatId], data.messages);
    };

    if (currentUser?.id) {
      socket.current = io(socketMessagesUrl, {
        query: {
          userId: currentUser.id,
        },
      });

      socket.current.on('messages:update', handleMessagesUpdate);
    }

    return () => {
      socket.current?.off('messages:update', handleMessagesUpdate);
      socket.current?.disconnect();
    };
  }, [currentUser?.id]);

  useEffect(() => {
    socket.current?.emit('rooms:join', chatId);

    return () => {
      socket.current?.emit('rooms:leave', chatId);
    };
  }, [chatId]);

  return children;
};
