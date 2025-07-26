import { SearchUsersModal } from '@/features/user/search-users';
import { Button, Typograpghy, useModal } from '@/shared';

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
        Start Chat
      </Button>
      <SearchUsersModal open={modal.open} onClose={modal.handleClickClose} />
    </div>
  );
};
