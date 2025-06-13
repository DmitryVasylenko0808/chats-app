import { UsersList } from '@/features/users/components';
import { useSearchUsers } from '@/features/users/hooks';
import { User } from '@/features/users/types';
import { useAlerts } from '@/shared/hooks';
import { Loader, Modal, ModalProps, TextField, Typograpghy } from '@/shared/ui';

import { useNavigate } from 'react-router';

import { useCreateChat } from '../hooks';

type NewChatModalProps = ModalProps;

export const NewChatModal = (modalProps: NewChatModalProps) => {
  const { search, data, isFetching, handleChangeSearch } = useSearchUsers();
  const { mutateAsync } = useCreateChat();
  const { notify } = useAlerts();
  const navigate = useNavigate();

  const handleClick = (user: User) =>
    mutateAsync(user.id)
      .then((data) => {
        modalProps.onClose();
        navigate(`/chats/${data.id}`);
      })
      .catch((err) => notify({ variant: 'error', title: 'Error', text: err.message }));

  const isShowList = search && data;

  return (
    <Modal className="w-md" {...modalProps}>
      <Typograpghy tagVariant="h2" className="mb-6">
        New Chat
      </Typograpghy>
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
