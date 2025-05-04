import { useAuth } from '@/features/auth/hooks';
import { UserProfile } from '@/features/users/components';

const ProfilePage = () => {
  const { currentUser } = useAuth();

  return <UserProfile userId={currentUser?.id} editable />;
};

export default ProfilePage;
