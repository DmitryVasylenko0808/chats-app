import { Button, Typograpghy, useModal } from '@/shared';

import { NewChatModal } from './new-chat-modal';

export const EmptyChat = () => {
  const modal = useModal();

  return (
    <div className="flex flex-col items-center justify-center">
      <Typograpghy tagVariant="h3" className="mb-1.5">
        Select a chat
      </Typograpghy>
      <Typograpghy className="mb-4">
        Choose a chat from the list or start a new conversation
      </Typograpghy>
      <Button variant="primary" onClick={modal.handleClickOpen}>
        New Chat
      </Button>
      <NewChatModal open={modal.open} onClose={modal.handleClickClose} />
    </div>
  );
};
