import { SendMessageForm } from '@/features/message/send-message';

import { useParams } from 'react-router';

import { ChatHeader } from './chat-header';
import { ChatMessages } from './chat-messages';

const ChatPage = () => {
  const { id } = useParams();

  return (
    <div className="flex">
      <div className="flex min-h-screen flex-1 flex-col">
        <ChatHeader chatId={Number(id)} />
        <ChatMessages chatId={Number(id)} />
        <SendMessageForm chatId={Number(id)} />
      </div>
    </div>
  );
};

export default ChatPage;
