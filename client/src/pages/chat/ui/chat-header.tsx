import { useGetChatById } from '@/entities/chat';
import { Button, Typograpghy, useAlerts, useAuth } from '@/shared';

import { useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router';

import { ChatMenu } from './chat-menu';

type ChatHeaderProps = { chatId?: number };

export const ChatHeader = ({ chatId }: Readonly<ChatHeaderProps>) => {
  const { currentUser } = useAuth();
  const { data, error } = useGetChatById(Number(chatId));
  const { notify } = useAlerts();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate('/');
      notify({ variant: 'error', title: 'Error', text: error.message });
    }
  }, [error]);

  const participant = data?.members.find((m) => m.id !== currentUser?.id);

  const handleClickBack = () => navigate(-1);

  return (
    <div className="border-b-secondary-300 dark:border-b-dark-100 flex h-22 items-center border-b px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="text" onClick={handleClickBack}>
            <AiOutlineArrowLeft size={24} />
          </Button>
          {data && (
            <div className="flex items-center gap-4">
              <img
                src={participant?.avatar}
                className="h-10 w-10 rounded-full"
                alt="participant-avatar"
              />
              <Typograpghy tagVariant="h3" className="flex-1">
                {participant?.name || 'Deleted Account'}
              </Typograpghy>
            </div>
          )}
        </div>
        <ChatMenu chatId={Number(chatId)} />
      </div>
    </div>
  );
};
