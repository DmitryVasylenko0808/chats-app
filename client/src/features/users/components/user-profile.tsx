import { useCreateChat } from '@/features/chats/hooks';
import { Button, Loader } from '@/shared/ui';

import { useGetUser } from '../hooks';
import { UserProfileMenu } from './user-profile-menu';

type UserProfileProps = {
  userId?: number | null;
  currentUserProfile?: boolean;
  sendMessageBtn?: boolean;
};

export const UserProfile = ({
  userId,
  currentUserProfile,
  sendMessageBtn = true,
}: Readonly<UserProfileProps>) => {
  const { data, isLoading, isError } = useGetUser(userId);
  const { createNewChat, isPending } = useCreateChat();

  const handleClick = () => createNewChat(userId).catch((err) => alert(err.message));

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
        {currentUserProfile && (
          <div className="flex items-center justify-between px-6 pt-6">
            <h3 className="text-xl font-semibold">My Profile</h3>
            <UserProfileMenu user={data} />
          </div>
        )}
        <div className="p-6">
          <div className="mb-6 flex justify-center">
            <img src={data.avatar} className="h-24 w-24 rounded-full" alt="user-avatar" />
          </div>
          <h4 className="mb-7 text-center text-base font-semibold">{data.name}</h4>
          <p className="text-body mb-6">{data.description}</p>
          <div className="flex flex-col space-y-6">
            <div>
              <label className="block font-semibold">Username</label>
              <p className="text-body">{data.username}</p>
            </div>
            <div>
              <label className="block font-semibold">Name</label>
              <p className="text-body">{data.name}</p>
            </div>
            <div>
              <label className="block font-semibold">Email</label>
              <p className="text-body">{data.email}</p>
            </div>
            <div>
              <label className="block font-semibold">Joined At</label>
              <p className="text-body">{new Date(data.createdAt).toLocaleDateString()}</p>
            </div>
            {!currentUserProfile && sendMessageBtn && (
              <Button variant="primary" onClick={handleClick} fullWidth>
                {isPending ? <Loader variant="secondary" size="sm" /> : 'Send Message'}
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  );
};
