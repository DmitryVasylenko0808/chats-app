import { Chat, User } from '@/entities';
import { useAuth } from '@/features/auth/hooks';
import { Typograpghy } from '@/shared/ui';

type ChatsListProps = { chats?: Chat[]; onClickItem?: (chat: Chat) => void };

export const ChatsList = ({ chats, onClickItem }: Readonly<ChatsListProps>) => {
  if (!chats || !chats.length) {
    return null;
  }

  const { currentUser } = useAuth();

  return (
    <ul className="flex flex-col">
      {chats.map((chat) => (
        <ChatsListItem
          chat={chat}
          participant={chat.members.find((m) => m.id !== currentUser?.id)}
          key={chat.id}
          onClick={() => onClickItem?.(chat)}
        />
      ))}
    </ul>
  );
};

type ChatsListItemProps = { chat: Chat; participant?: User; onClick?: () => void };

const ChatsListItem = ({ chat, participant, onClick }: Readonly<ChatsListItemProps>) => (
  <li
    className="hover:bg-secondary-300 dark:hover:bg-dark-200 flex items-center gap-3 rounded-2xl p-2.5 duration-100 hover:cursor-pointer"
    key={chat.id}
    onClick={onClick}
  >
    <img src={participant?.avatar} alt="user-avatar" className="h-10 w-10 rounded-full" />
    <Typograpghy tagVariant="h4" className="truncate">
      {participant?.name || 'Deleted Account'}
    </Typograpghy>
  </li>
);
