import { useDebounce } from '@/shared';

import { useState } from 'react';

import { useGetUsers } from './use-get-users';

export const useSearchUsers = () => {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search, 500);
  const { data, isFetching } = useGetUsers(debounced);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  return { search, handleChangeSearch, data, isFetching };
};
