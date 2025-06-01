import { useAuth } from '@/features/auth/hooks';
import { StartMessaging } from '@/features/chats/components';
import { Loader } from '@/shared/ui';

import { useParams } from 'react-router';

import { useGetUser } from '../hooks';
import { UserInfo } from './user-info';
import { UserProfileHeader } from './user-profile-header';

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
      <div>
        {isCurrentUserProfile && <UserProfileHeader user={data} />}
        <div className="p-6">
          <UserInfo user={data} />
          {!isCurrentUserProfile && <StartMessaging user={data} />}
        </div>
      </div>
    )
  );
};
