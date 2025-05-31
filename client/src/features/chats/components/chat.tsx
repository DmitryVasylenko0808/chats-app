import { Loader } from '@/shared/ui';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { useGetChatById } from '../hooks';
import { useCurrentChatStore } from '../store';
import { ChatDetails } from './chat-details';
import { ChatInfo } from './chat-info';
import { ChatMenu } from './chat-menu';
import { Messages } from './messages';
import { SendMessageForm } from './send-message-form';

type ChatProps = { chatId: number };

export const Chat = ({ chatId }: Readonly<ChatProps>) => {
  const { data, isLoading, error } = useGetChatById(chatId);
  const { reset } = useCurrentChatStore();
  const [showDetails, setShowDetails] = useState(false);

  const handleClickShowDetails = () => setShowDetails(true);
  const handleClickHideDetails = () => setShowDetails(false);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  if (error) {
    toast(error.message);
    reset();
  }

  return (
    data && (
      <div className="flex">
        <div className="flex min-h-screen flex-1 flex-col">
          <div className="border-b-body/10 flex h-22 items-center border-b-2 px-6">
            <div className="flex w-full items-center justify-between">
              <ChatInfo chat={data} onShowDetails={handleClickShowDetails} />
              <ChatMenu chatId={chatId} />
            </div>
          </div>
          <Messages chatId={chatId} />
          <SendMessageForm chat={data} />
        </div>
        {showDetails && <ChatDetails chat={data} onHideDetails={handleClickHideDetails} />}
      </div>
    )
  );
};
