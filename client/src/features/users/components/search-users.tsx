import { Loader, TextField } from '@/shared/ui';

import { Link } from 'react-router';

import { useSearchUsers } from '../hooks';

export const SearchUsers = () => {
  const { search, handleChangeSearch, data, isFetching } = useSearchUsers();

  return (
    <div className="px-6 py-3">
      <div className="relative">
        <TextField placeholder="Search users by name..." onChange={handleChangeSearch} />
        {data?.length !== 0 && (
          <div className="border-body/10 absolute top-full left-0 z-10 my-1 max-h-[420px] min-w-full overflow-auto rounded-2xl border bg-white py-3 shadow-xl">
            {isFetching ? (
              <div className="flex w-full justify-center px-3 py-1.5">
                <Loader variant="primary" size="sm" />
              </div>
            ) : (
              <ul className="flex flex-col">
                {data?.map((user) => (
                  <li
                    className="hover:bg-secondary flex cursor-pointer px-3 py-1.5 duration-100"
                    key={user.id}
                  >
                    <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
                      <img src={user.avatar} className="h-10 w-10 rounded-full" alt="user-avatar" />
                      <div className="justify-center-center flex flex-col">
                        <p className="font-medium">{user.name}</p>
                        <span className="text-body text-sm font-normal">{user.username}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
