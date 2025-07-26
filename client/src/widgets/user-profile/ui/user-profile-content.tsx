import { useGetUser, UserInfo } from '@/entities/user';
import { CreateChatButton } from '@/features/chat/create-chat';
import { EditProfileButton } from '@/features/user/edit-user-profile';
import { useAuth } from '@/shared';

import { useParams } from 'react-router';

export const UserProfileContent = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { data } = useGetUser(Number(id));

  const isCurrentUserProfile = currentUser?.id === Number(id);

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
