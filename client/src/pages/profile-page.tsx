import { useAuth } from '@/features/auth/hooks';
import { UserProfile } from '@/features/users/components';

import { useParams } from 'react-router';

const ProfilePage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();

  return <UserProfile userId={Number(id)} currentUserProfile={currentUser?.id === Number(id)} />;
};

export default ProfilePage;
