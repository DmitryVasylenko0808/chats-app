import { useAuth } from '@/features/auth/hooks';
import { User } from '@/features/users/types';
import { Loader, Typograpghy } from '@/shared/ui';
import { cn } from '@/utils/cn';

import { NavLink } from 'react-router';

import { useGetChats } from '../hooks';
import { Chat } from '../types';

export const RecentChats = () => {
  const { currentUser } = useAuth();
  const { data, isLoading } = useGetChats(currentUser?.id);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-10">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  return (
    <div className="pt-1.5 pb-3">
      <Typograpghy tagVariant="h4" className="mb-4 px-6">
        Recent
      </Typograpghy>
      <div className="scrollbar-custom h-[calc(100vh-94px-88px-40px)] overflow-y-auto">
        <ul className="flex flex-col">
          {data?.map((item) => (
            <RecentChatsItem
              chat={item}
              participant={item.members.find((m) => m.id !== currentUser?.id)}
              key={item.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

type RecentChatsItemProps = {
  chat: Chat;
  participant?: User;
};

export const RecentChatsItem = ({ chat, participant }: Readonly<RecentChatsItemProps>) => (
  <li className="flex">
    <NavLink
      to={`/chats/${chat.id}`}
      className={({ isActive }) =>
        cn('hover:bg-secondary-300 flex w-full items-center gap-3 px-5 py-4 duration-100', {
          'bg-secondary-300': isActive,
        })
      }
    >
      <img src={participant?.avatar} className="h-10 w-10 rounded-full" alt="user-avatar" />
      <div className="flex w-full min-w-0 flex-col">
        <div className="flex items-center justify-between">
          <Typograpghy tagVariant="h4" className="truncate">
            {participant?.name || 'Deleted Account'}
          </Typograpghy>
          {chat.lastMessage && (
            <Typograpghy className="text-body text-xs">
              {new Date(chat.lastMessage?.createdAt).toLocaleDateString()}
            </Typograpghy>
          )}
        </div>
        <Typograpghy className="truncate text-sm">{chat.lastMessage?.text}</Typograpghy>
      </div>
    </NavLink>
  </li>
);
