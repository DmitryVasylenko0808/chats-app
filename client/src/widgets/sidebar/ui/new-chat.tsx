import { SearchUsersModal } from '@/features/user/search-users';
import { Button, useModal } from '@/shared';

import { TbMessageCirclePlus } from 'react-icons/tb';

export const NewChat = () => {
  const modal = useModal();

  return (
    <div className="my-6 px-6">
      <Button variant="primary" onClick={modal.handleClickOpen} className="gap-2" fullWidth>
        <TbMessageCirclePlus size={20} /> New Chat
      </Button>
      <SearchUsersModal open={modal.open} onClose={modal.handleClickClose} />
    </div>
  );
};
