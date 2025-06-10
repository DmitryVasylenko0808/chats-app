import { useCreateChat } from '@/features/chats/hooks';
import { User } from '@/features/users/types';
import { useAlerts } from '@/shared/hooks';
import { Button, Loader } from '@/shared/ui';

type StartMessagingProps = { user: User };

export const StartMessaging = ({ user }: Readonly<StartMessagingProps>) => {
  const { mutateAsync, isPending } = useCreateChat();
  const { notify } = useAlerts();

  const handleClick = () =>
    mutateAsync(Number(user.id)).catch((err) => notify({ variant: 'error', text: err.message }));

  return (
    <div className="w-full py-6">
      <Button variant="primary" onClick={handleClick} fullWidth>
        {isPending ? <Loader variant="secondary" size="sm" /> : 'Send Message'}
      </Button>
    </div>
  );
};
