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
          <label className="block font-semibold">Username</label>
          <Typograpghy>{user.username}</Typograpghy>
        </div>
        <div>
          <label className="block font-semibold">Name</label>
          <Typograpghy>{user.name}</Typograpghy>
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <Typograpghy>{user.email}</Typograpghy>
        </div>
        <div>
          <label className="block font-semibold">Joined At</label>
          <Typograpghy>{new Date(user.createdAt).toLocaleDateString()}</Typograpghy>
        </div>
      </div>
    </div>
  );
};
