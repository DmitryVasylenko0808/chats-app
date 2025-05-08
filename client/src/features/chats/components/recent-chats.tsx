import { useAuth } from '@/features/auth/hooks';
import { Loader } from '@/shared/ui';

import { useGetChats } from '../hooks';
import { useCurrentChatStore } from '../store';
import { ChatListItem } from './chat-list-item';

export const RecentChats = () => {
  const { currentUser } = useAuth();
  const { data, isLoading } = useGetChats(currentUser?.id);
  const { chatId, setCurrentChat } = useCurrentChatStore();

  const handleClickChat = (id: number) => setCurrentChat(id);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-10">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  return (
    <div className="pt-1.5 pb-3">
      <h4 className="mb-4 px-6 text-base font-semibold">Recent</h4>
      <div className="h-[calc(100vh-60px-64px-64px)] overflow-y-auto">
        <ul className="flex flex-col">
          {data?.map((item) => (
            <ChatListItem
              chat={item}
              active={item.id === chatId}
              key={item.id}
              onClick={() => handleClickChat(item.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
