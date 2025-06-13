import { useAuth } from '@/features/auth/hooks';
import { CreateChatButton } from '@/features/chats/components';
import { useModal } from '@/shared/hooks';
import { Button, Loader } from '@/shared/ui';

import { useParams } from 'react-router';

import { useGetUser } from '../hooks';
import { EditingUserProfileModal } from './editing-user-profile-modal';
import { UserInfo } from './user-info';

export const UserProfile = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { data, isLoading, isError } = useGetUser(Number(id));
  const editModal = useModal();

  const isCurrentUserProfile = currentUser?.id === Number(id);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    data && (
      <div className="min-w-xs">
        <UserInfo user={data} />
        {!isCurrentUserProfile ? (
          <CreateChatButton user={data} />
        ) : (
          <Button
            variant="secondary"
            className="mt-3"
            onClick={editModal.handleClickOpen}
            fullWidth
          >
            Edit Profile
          </Button>
        )}
        <EditingUserProfileModal open={editModal.open} onClose={editModal.handleClickClose} />
      </div>
    )
  );
};
