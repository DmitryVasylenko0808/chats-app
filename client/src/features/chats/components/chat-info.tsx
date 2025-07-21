import { Chat } from '@/entities';
import { useAuth } from '@/features/auth/hooks';
import { Typograpghy } from '@/shared';

type ChatInfoProps = { chat: Chat };

export const ChatInfo = ({ chat }: Readonly<ChatInfoProps>) => {
  const { currentUser } = useAuth();

  const participant = chat?.members.find((m) => m.id !== currentUser?.id);

  return (
    <div className="flex items-center gap-4">
      <img src={participant?.avatar} className="h-10 w-10 rounded-full" alt="participant-avatar" />
      <Typograpghy tagVariant="h3" className="flex-1">
        {participant?.name || 'Deleted Account'}
      </Typograpghy>
    </div>
  );
};
