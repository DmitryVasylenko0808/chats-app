import { useGetUser, UserInfo } from '@/entities/user';
import { CreateChatButton } from '@/features/chat/create-chat';
import { EditProfileButton } from '@/features/user/edit-user-profile';
import { Loader, useAuth } from '@/shared';

import { useParams } from 'react-router';

export const UserProfile = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { data, isLoading, isError } = useGetUser(Number(id));

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
        <UserInfo user={data}>
          {!isCurrentUserProfile ? <CreateChatButton user={data} /> : <EditProfileButton />}
        </UserInfo>
      </div>
    )
  );
};
