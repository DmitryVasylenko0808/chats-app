import { Typograpghy } from '@/shared/ui';

import { User } from '../types';

type UserInfoProps = { user: User };

export const UserInfo = ({ user }: Readonly<UserInfoProps>) => {
  return (
    <div>
      <div className="mb-6 flex justify-center">
        <img src={user.avatar} className="h-24 w-24 rounded-full" alt="user-avatar" />
      </div>
      <Typograpghy tagVariant="h3" className="mb-7 text-center">
        {user.name}
      </Typograpghy>
      <Typograpghy className="mb-6">{user.description}</Typograpghy>
      <div className="flex flex-col space-y-6">
        <div>
          <Typograpghy tagVariant="h4">Username</Typograpghy>
          <Typograpghy>{user.username}</Typograpghy>
        </div>
        <div>
          <Typograpghy tagVariant="h4">Name</Typograpghy>
          <Typograpghy>{user.name}</Typograpghy>
        </div>
        <div>
          <Typograpghy tagVariant="h4">Email</Typograpghy>
          <Typograpghy>{user.email}</Typograpghy>
        </div>
        <div>
          <Typograpghy tagVariant="h4">Joined At</Typograpghy>
          <Typograpghy>{new Date(user.createdAt).toLocaleDateString()}</Typograpghy>
        </div>
      </div>
    </div>
  );
};
