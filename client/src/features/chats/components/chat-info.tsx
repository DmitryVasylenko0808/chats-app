import { useAuth } from '@/features/auth/hooks';

import { Chat } from '../types';

type ChatInfoProps = { chat: Chat; onShowDetails: () => void };

export const ChatInfo = ({ chat, onShowDetails }: Readonly<ChatInfoProps>) => {
  const { currentUser } = useAuth();

  const participant = chat?.members.find((m) => m.id !== currentUser?.id);

  return (
    <div className="flex cursor-pointer items-center gap-4" onClick={onShowDetails}>
      <img
        src={participant?.avatar || undefined}
        className="bg-body h-10 w-10 rounded-full"
        alt="participant-avatar"
      />
      <h3 className="flex-1 text-base font-semibold">{participant?.name}</h3>
    </div>
  );
};
