import { useSearchUsers } from '@/features/users/hooks';
import { Loader, Modal, ModalProps, TextField } from '@/shared/ui';

import { toast } from 'react-toastify';

import { useCreateChat } from '../hooks';

type NewChatModalProps = ModalProps;

export const NewChatModal = (modalProps: NewChatModalProps) => {
  const { search, data, isFetching, handleChangeSearch } = useSearchUsers();
  const { mutateAsync } = useCreateChat();

  const handleClick = (userId: number) =>
    mutateAsync(userId).catch((err) => toast.error(err.message));

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
          <ul className="flex flex-col">
            {isShowList &&
              data.map((user) => (
                <li
                  className="hover:bg-secondary flex cursor-pointer px-3 py-1.5 duration-100"
                  onClick={() => handleClick(user.id)}
                >
                  <div className="flex items-center gap-3">
                    <img src={user?.avatar} className="h-10 w-10 rounded-full" alt="user-avatar" />
                    <div className="justify-center-center flex flex-col">
                      <p className="font-medium">{user.name}</p>
                      <span className="text-body text-sm font-normal">{user.username}</span>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};
