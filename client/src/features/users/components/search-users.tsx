import { Loader, TextField } from '@/shared/ui';

import { useNavigate } from 'react-router';

import { useSearchUsers } from '../hooks';
import { User } from '../types';
import { UsersList } from './users-list';

export const SearchUsers = () => {
  const { search, handleChangeSearch, data, isFetching } = useSearchUsers();
  const navigate = useNavigate();

  const handleClick = (user: User) => navigate(`/profile/${user.id}`);

  return (
    <div className="p-6">
      <div className="relative">
        <TextField placeholder="Search users by name..." onChange={handleChangeSearch} />
        {search && data?.length !== 0 && (
          <div className="border-body/10 absolute top-full left-0 z-10 my-1 max-h-[420px] min-w-full overflow-auto rounded-2xl border bg-white py-3 shadow-xl">
            {isFetching ? (
              <div className="flex w-full justify-center px-3 py-1.5">
                <Loader variant="primary" size="sm" />
              </div>
            ) : (
              <UsersList users={data} onClickItem={handleClick} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
