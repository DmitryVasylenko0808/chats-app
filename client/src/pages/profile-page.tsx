import { useAuth } from '@/features/auth/hooks';
import { UserProfile } from '@/features/users/components';

const ProfilePage = () => {
  const { currentUserId } = useAuth();

  return <UserProfile userId={currentUserId} editable />;
};

export default ProfilePage;
