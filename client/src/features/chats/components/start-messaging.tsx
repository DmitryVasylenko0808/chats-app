import { SearchUsersModal } from '@/features/user/search-users';
import { Button, useModal } from '@/shared';

export const StartMessaging = () => {
  const modal = useModal();

  return (
    <div className="my-6 px-6">
      <Button variant="primary" onClick={modal.handleClickOpen} fullWidth>
        Start Messaging
      </Button>
      <SearchUsersModal open={modal.open} onClose={modal.handleClickClose} />
    </div>
  );
};
