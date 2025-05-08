import { useAuth } from '@/features/auth/hooks';
import { cn } from '@/utils/cn';

import { Chat } from '../types';

type ChatListItemProps = { chat: Chat; active: boolean; onClick: () => void };

export const ChatListItem = ({ chat, active, onClick }: Readonly<ChatListItemProps>) => {
  const { currentUser } = useAuth();

  const participant = chat.members.find((m) => m.id !== currentUser?.id);

  return (
    <li
      className={cn('hover:bg-active-chat flex cursor-pointer px-5 py-4 duration-100', {
        'bg-active-chat': active,
      })}
    >
      <div onClick={onClick} className="flex w-full items-center gap-3">
        <img
          src={participant?.avatar || undefined}
          className="h-10 w-10 rounded-full"
          alt="user-avatar"
        />
        <div className="flex w-full min-w-0 flex-col">
          <div className="flex items-center justify-between">
            <p className="truncate font-medium">{participant?.name}</p>
            {chat.lastMessage && (
              <span className="text-body text-xs font-normal">
                {new Date(chat.lastMessage?.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
          <span className="text-body white truncate text-sm font-normal">
            {chat.lastMessage?.text}
          </span>
        </div>
      </div>
    </li>
  );
};
