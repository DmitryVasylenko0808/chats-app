import { useAuth } from '@/features/auth/hooks';
import { UserProfile } from '@/features/users/components';
import { Button } from '@/shared/ui';
import { XMarkIcon } from '@heroicons/react/16/solid';

import { Chat } from '../types';

type ChatDetailsProps = { chat: Chat; onHideDetails: () => void };

export const ChatDetails = ({ chat, onHideDetails }: ChatDetailsProps) => {
  const { currentUser } = useAuth();

  const participant = chat?.members.find((m) => m.id !== currentUser?.id);

  return (
    <div className="border-l-body/10 min-h-screen w-[376px] border-l-2 pt-8">
      <div className="flex justify-end px-6">
        <Button variant="text" onClick={onHideDetails}>
          <XMarkIcon width={24} height={24} />
        </Button>
      </div>
      <UserProfile userId={participant?.id} sendMessageBtn={false} />
    </div>
  );
};
