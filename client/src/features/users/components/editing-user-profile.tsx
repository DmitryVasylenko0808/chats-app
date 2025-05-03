import { useAuth } from '@/features/auth/hooks';
import { Button, Loader } from '@/shared/ui';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

import { useNavigate } from 'react-router';

import { useGetUser } from '../hooks';
import { EditingUserProfileForm } from './editing-user-profile-form';

export const EditingUserProfile = () => {
  const { currentUserId } = useAuth();
  const { data, isLoading, isError } = useGetUser(currentUserId);
  const navigate = useNavigate();

  const handleClickBack = () => navigate(-1);

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
    <div>
      <div className="flex items-center justify-between p-6">
        <Button variant="text" onClick={handleClickBack}>
          <ArrowLeftIcon width={18} height={18} />
        </Button>
      </div>
      <div className="px-6">{data && <EditingUserProfileForm user={data} />}</div>
    </div>
  );
};
