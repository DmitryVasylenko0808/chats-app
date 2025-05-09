import { useAuth } from '@/features/auth/hooks';
import { Loader } from '@/shared/ui';

import { useEffect, useRef } from 'react';

import { useGetMessages } from '../hooks';
import { Message } from './message';

type MessagesProps = {
  chatId: number;
};

export const Messages = ({ chatId }: MessagesProps) => {
  const { currentUser } = useAuth();
  const { data, isLoading, error } = useGetMessages(chatId);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  if (error) {
    alert(error.message);
  }

  return (
    <div className="scrollbar-custom h-[calc(100vh-88px-96px)] overflow-y-auto p-6">
      <ul className="flex flex-col space-y-4">
        {data?.map((m) => (
          <Message message={m} participantMessage={m.senderId !== currentUser?.id} key={m.id} />
        ))}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
};
