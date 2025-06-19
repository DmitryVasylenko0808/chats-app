import { socketUrl } from '@/config/contants';
import { Chat } from '@/entities';
import { useAuth } from '@/features/auth/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import { UpdatedMessages } from '../types';

export const SocketContainer = ({ children }: Readonly<PropsWithChildren>) => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const socket = useRef<Socket | null>(null);

  const chatId = Number(id);

  useEffect(() => {
    const handleChatsUpdate = (data: Chat[]) => {
      queryClient.setQueryData(['chats'], data);
    };
    const handleMessagesUpdate = (data: UpdatedMessages) => {
      queryClient.setQueryData(['messages', data.chatId], data.messages);
    };

    if (currentUser?.id) {
      socket.current = io(socketUrl, {
        query: {
          userId: currentUser.id,
        },
      });

      socket.current.on('chats:update', handleChatsUpdate);
      socket.current.on('messages:update', handleMessagesUpdate);
    }

    return () => {
      socket.current?.off('chats:update', handleChatsUpdate);
      socket.current?.off('messages:update', handleMessagesUpdate);
      socket.current?.disconnect();
    };
  }, [currentUser?.id]);

  useEffect(() => {
    socket.current?.emit('chats:join', chatId);

    return () => {
      socket.current?.emit('chats:leave', chatId);
    };
  }, [chatId]);

  return children;
};
