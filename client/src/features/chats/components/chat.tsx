import { useAuth } from '@/features/auth/hooks';
import { Button, Loader, TextField } from '@/shared/ui';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';

import { useGetChatById } from '../hooks';
import { useCurrentChatStore } from '../store';
import { ChatMenu } from './chat-menu';

type ChatProps = { chatId: number };

export const Chat = ({ chatId }: Readonly<ChatProps>) => {
  const { data, isLoading, error } = useGetChatById(chatId);
  const { currentUser } = useAuth();
  const { reset } = useCurrentChatStore();

  const participant = data?.members.find((m) => m.id !== currentUser?.id);

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
    <div className="flex min-h-screen flex-col">
      <div className="border-b-body/10 flex h-22 items-center border-b-2 px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={participant?.avatar}
              className="bg-body h-10 w-10 rounded-full"
              alt="participant-avatar"
            />
            <h3 className="flex-1 text-base font-semibold">{participant?.name}</h3>
          </div>
          <ChatMenu chatId={chatId} />
        </div>
      </div>
      <div className="h-[calc(100vh-88px-96px)] overflow-y-auto p-6">
        <ul className="flex flex-col space-y-4">
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
          <li>Message</li>
        </ul>
      </div>
      <div className="border-t-body/10 flex h-24 items-center border-t-2 px-6">
        <div className="flex w-full gap-4">
          <TextField placeholder="Enter message..." />
          <Button variant="primary" className="min-w-max px-4">
            <PaperAirplaneIcon width={24} height={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};
