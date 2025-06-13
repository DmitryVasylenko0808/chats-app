import { useAuth } from '@/features/auth/hooks';
import { UserInfo } from '@/features/users/components';
import { Button } from '@/shared/ui';

import { AiOutlineClose } from 'react-icons/ai';

import { Chat } from '../types';

type ChatDetailsProps = { chat: Chat; onHideDetails: () => void };

export const ChatDetails = ({ chat, onHideDetails }: ChatDetailsProps) => {
  const { currentUser } = useAuth();

  const participant = chat?.members.find((m) => m.id !== currentUser?.id);

  return (
    <div className="border-l-secondary-300 dark:border-l-dark-100 min-h-screen w-[376px] border-l pt-8">
      <div className="flex justify-end px-6">
        <Button variant="text" onClick={onHideDetails}>
          <AiOutlineClose size={24} />
        </Button>
      </div>
      <div className="px-6">{participant && <UserInfo user={participant} />}</div>
    </div>
  );
};
