import { NewChatModal } from '@/features/chats/components';
import { useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui';

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
