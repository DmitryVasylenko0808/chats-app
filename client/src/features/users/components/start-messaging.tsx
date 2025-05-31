import { useCreateChat } from '@/features/chats/hooks';
import { Button, Loader } from '@/shared/ui';

import { toast } from 'react-toastify';

import { User } from '../types';

type StartMessagingProps = { user: User };

export const StartMessaging = ({ user }: Readonly<StartMessagingProps>) => {
  const { mutateAsync, isPending } = useCreateChat();

  const handleClick = () => mutateAsync(Number(user.id)).catch((err) => toast(err.message));

  return (
    <div className="w-full py-6">
      <Button variant="primary" onClick={handleClick} fullWidth>
        {isPending ? <Loader variant="secondary" size="sm" /> : 'Send Message'}
      </Button>
    </div>
  );
};
