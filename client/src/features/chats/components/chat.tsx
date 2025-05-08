import { Button, Loader, TextField } from '@/shared/ui';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';

import { useState } from 'react';

import { useGetChatById } from '../hooks';
import { useCurrentChatStore } from '../store';
import { ChatDetails } from './chat-details';
import { ChatInfo } from './chat-info';
import { ChatMenu } from './chat-menu';
import { Messages } from './messages';

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
    alert(error.message);
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
          <div className="border-t-body/10 flex h-24 items-center border-t-2 px-6">
            <div className="flex w-full gap-4">
              <TextField placeholder="Enter message..." />
              <Button variant="primary" className="min-w-max px-4">
                <PaperAirplaneIcon width={24} height={24} />
              </Button>
            </div>
          </div>
        </div>
        {showDetails && <ChatDetails chat={data} onHideDetails={handleClickHideDetails} />}
      </div>
    )
  );
};
