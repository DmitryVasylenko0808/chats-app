import { useAlerts } from '@/shared/hooks';
import { Button, Loader } from '@/shared/ui';

import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router';

import { useGetChatById } from '../hooks';
import { ChatDetails } from './chat-details';
import { ChatInfo } from './chat-info';
import { ChatMenu } from './chat-menu';
import { Messages } from './messages';
import { SendMessageForm } from './send-message-form';

export const Chat = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetChatById(Number(id));
  const { notify } = useAlerts();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const handleClickBack = () => navigate(-1);
  const handleClickShowDetails = () => setShowDetails(true);
  const handleClickHideDetails = () => setShowDetails(false);

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
          <div className="border-b-secondary-300 flex h-22 items-center border-b-2 px-6">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="text" onClick={handleClickBack}>
                  <AiOutlineArrowLeft size={24} />
                </Button>
                <ChatInfo chat={data} onShowDetails={handleClickShowDetails} />
              </div>
              <ChatMenu chatId={Number(id)} />
            </div>
          </div>
          <Messages chatId={Number(id)} />
          <SendMessageForm chat={data} />
        </div>
        {showDetails && <ChatDetails chat={data} onHideDetails={handleClickHideDetails} />}
      </div>
    )
  );
};
