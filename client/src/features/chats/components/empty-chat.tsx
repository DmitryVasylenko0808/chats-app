import { useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui';

import { NewChatModal } from './new-chat-modal';

export const EmptyChat = () => {
  const modal = useModal();

  return (
    <div className="flex h-full flex-col items-center justify-center px-6">
      <h3 className="mb-1.5 text-lg font-semibold">Select a chat</h3>
      <p className="text-body mb-4">Choose a chat from the list or start a new conversation</p>
      <Button variant="primary" onClick={modal.handleClickOpen}>
        New Chat
      </Button>
      <NewChatModal open={modal.open} onClose={modal.handleClickClose} />
    </div>
  );
};
