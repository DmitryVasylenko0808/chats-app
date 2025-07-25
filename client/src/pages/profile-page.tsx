import { UserProfile } from '@/features/users/components';

const ProfilePage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-sm px-6">
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
