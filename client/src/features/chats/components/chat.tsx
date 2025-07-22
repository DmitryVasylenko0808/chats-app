import { useGetChatById } from '@/entities/chat';
import { Messages, SendMessageForm } from '@/features/messages/components';
import { Button, Loader, useAlerts } from '@/shared';

import { useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router';

import { ChatInfo } from './chat-info';
import { ChatMenu } from './chat-menu';

export const Chat = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetChatById(Number(id));
  const { notify } = useAlerts();
  const navigate = useNavigate();

  const handleClickBack = () => navigate(-1);

  useEffect(() => {
    if (error) {
      navigate('/');
      notify({ variant: 'error', title: 'Error', text: error.message });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  return (
    data && (
      <div className="flex">
        <div className="flex min-h-screen flex-1 flex-col">
          <div className="border-b-secondary-300 dark:border-b-dark-100 flex h-22 items-center border-b px-6">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-6">
                <Button variant="text" onClick={handleClickBack}>
                  <AiOutlineArrowLeft size={24} />
                </Button>
                <ChatInfo chat={data} />
              </div>
              <ChatMenu chatId={Number(id)} />
            </div>
          </div>
          <Messages chatId={Number(id)} />
          <SendMessageForm chat={data} />
        </div>
      </div>
    )
  );
};
