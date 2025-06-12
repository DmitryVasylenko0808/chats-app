import { useCreateChat } from '@/features/chats/hooks';
import { User } from '@/features/users/types';
import { useAlerts } from '@/shared/hooks';
import { Button, Loader } from '@/shared/ui';

import { useNavigate } from 'react-router';

type CreateChatButtonProps = { user: User };

export const CreateChatButton = ({ user }: Readonly<CreateChatButtonProps>) => {
  const { mutateAsync, isPending } = useCreateChat();
  const { notify } = useAlerts();
  const navigate = useNavigate();

  const handleClick = () =>
    mutateAsync(Number(user.id))
      .then((data) => navigate(`/chats/${data.id}`))
      .catch((err) => notify({ variant: 'error', text: err.message }));

  return (
    <div className="w-full py-6">
      <Button variant="primary" onClick={handleClick} fullWidth>
        {isPending ? <Loader variant="secondary" size="sm" /> : 'Create Chat'}
      </Button>
    </div>
  );
};
