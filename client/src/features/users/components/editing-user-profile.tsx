import { useAuth } from '@/features/auth/hooks';
import { Loader } from '@/shared/ui';

import { useGetUser } from '../hooks';
import { EditingUserProfileForm } from './editing-user-profile-form';

export const EditingUserProfile = () => {
  const { currentUser } = useAuth();
  const { data, isLoading, isError } = useGetUser(currentUser?.id);

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
        <h2 className="mb-6 text-xl font-semibold">Editing Profile</h2>
        <EditingUserProfileForm user={data} />
      </div>
    )
  );
};
