import { User } from '../types';
import { UserProfileMenu } from './user-profile-menu';

type UserProfileHeaderProps = { user: User };

export const UserProfileHeader = ({ user }: Readonly<UserProfileHeaderProps>) => {
  return (
    <div className="flex items-center justify-between px-6 pt-6">
      <h3 className="text-xl font-semibold">My Profile</h3>
      <UserProfileMenu user={user} />
    </div>
  );
};
