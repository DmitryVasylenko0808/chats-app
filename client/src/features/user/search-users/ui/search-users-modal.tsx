import { User, UsersList } from '@/entities/user';
import { Loader, Modal, ModalProps, TextField, Typograpghy } from '@/shared';

import { useLocation, useNavigate } from 'react-router';

import { useSearchUsers } from '../libs/hooks/use-search-users';

type SearchUsersModalProps = ModalProps;

export const SearchUsersModal = (modalProps: Readonly<SearchUsersModalProps>) => {
  const { search, data, isFetching, handleChangeSearch } = useSearchUsers();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (user: User) => {
    navigate(`/profile/${user.id}`, { state: { backgroundLocation: location } });
    modalProps.onClose();
  };

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
