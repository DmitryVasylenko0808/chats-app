import { NewChatModal } from '@/features/chats/components';
import { Button, useModal } from '@/shared';

export const StartMessaging = () => {
  const modal = useModal();

  return (
    <div className="my-6 px-6">
      <Button variant="primary" onClick={modal.handleClickOpen} fullWidth>
        Start Messaging
      </Button>
      <NewChatModal open={modal.open} onClose={modal.handleClickClose} />
    </div>
  );
};
