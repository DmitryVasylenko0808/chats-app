import { Typograpghy } from '@/shared/ui';

import { User } from '../types';

type UsersListProps = { users?: User[]; onClickItem: (user: User) => void };

export const UsersList = ({ users, onClickItem }: Readonly<UsersListProps>) => {
  if (!users || !users.length) {
    return null;
  }

  return (
    <ul className="flex flex-col">
      {users.map((user) => (
        <UserItem user={user} onClick={() => onClickItem(user)} key={user.id} />
      ))}
    </ul>
  );
};

type UserItemProps = { user: User; onClick: () => void };

const UserItem = ({ user, onClick }: Readonly<UserItemProps>) => (
  <li
    className="hover:bg-secondary-300 dark:hover:bg-dark-200 flex cursor-pointer rounded-2xl px-3 py-1.5 duration-100"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <img src={user.avatar} className="h-10 w-10 rounded-full" alt="user-avatar" />
      <div className="justify-center-center flex flex-col">
        <Typograpghy tagVariant="h4">{user.name}</Typograpghy>
        <Typograpghy>{user.username}</Typograpghy>
      </div>
    </div>
  </li>
);
