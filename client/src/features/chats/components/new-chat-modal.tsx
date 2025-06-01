import { UsersList } from '@/features/users/components';
import { useSearchUsers } from '@/features/users/hooks';
import { User } from '@/features/users/types';
import { Loader, Modal, ModalProps, TextField } from '@/shared/ui';

import { toast } from 'react-toastify';

import { useCreateChat } from '../hooks';

type NewChatModalProps = ModalProps;

export const NewChatModal = (modalProps: NewChatModalProps) => {
  const { search, data, isFetching, handleChangeSearch } = useSearchUsers();
  const { mutateAsync } = useCreateChat();

  const handleClick = (user: User) => mutateAsync(user.id).catch((err) => toast.error(err.message));

  const isShowList = search && data;

  return (
    <Modal {...modalProps}>
      <h2 className="mb-6 text-xl font-semibold">New Chat</h2>
      <TextField
        placeholder="Search users by name..."
        className="mb-6"
        onChange={handleChangeSearch}
      />
      <div className="scrollbar-custom h-[240px] overflow-auto">
        {isFetching ? (
          <div className="flex h-full w-full items-center justify-center px-3 py-1.5">
            <Loader variant="primary" size="lg" />
          </div>
        ) : (
          isShowList && <UsersList users={data} onClickItem={handleClick} />
        )}
      </div>
    </Modal>
  );
};
