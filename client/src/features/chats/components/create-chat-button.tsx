import { User } from '@/entities';
import { useCreateChat } from '@/features/chats/hooks';
import { Button, Loader, useAlerts } from '@/shared';

import { useNavigate } from 'react-router';

type CreateChatButtonProps = { user: User };

export const CreateChatButton = ({ user }: Readonly<CreateChatButtonProps>) => {
  const { mutateAsync, isPending } = useCreateChat();
  const { notify } = useAlerts();
  const navigate = useNavigate();

  const handleClick = () =>
    mutateAsync(Number(user.id))
      .then((data) => navigate(`/chats/${data.id}`))
      .catch((err) => notify({ variant: 'error', title: 'Error', text: err.message }));

  return (
    <div className="mt-3 w-full">
      <Button variant="primary" onClick={handleClick} fullWidth>
        {isPending ? <Loader variant="secondary" size="sm" /> : 'Create Chat'}
      </Button>
    </div>
  );
};
