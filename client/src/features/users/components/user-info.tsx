import { User } from '../types';

type UserInfoProps = { user: User };

export const UserInfo = ({ user }: Readonly<UserInfoProps>) => {
  return (
    <div>
      <div className="mb-6 flex justify-center">
        <img src={user.avatar} className="h-24 w-24 rounded-full" alt="user-avatar" />
      </div>
      <h4 className="mb-7 text-center text-base font-semibold">{user.name}</h4>
      <p className="text-body mb-6">{user.description}</p>
      <div className="flex flex-col space-y-6">
        <div>
          <label className="block font-semibold">Username</label>
          <p className="text-body">{user.username}</p>
        </div>
        <div>
          <label className="block font-semibold">Name</label>
          <p className="text-body">{user.name}</p>
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <p className="text-body">{user.email}</p>
        </div>
        <div>
          <label className="block font-semibold">Joined At</label>
          <p className="text-body">{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};
