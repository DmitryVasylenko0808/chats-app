import { useQuery } from '@tanstack/react-query';

import { getUsers } from '../api';

export const useGetUsers = (search?: string) => {
  return useQuery({
    queryKey: ['users', search],
    queryFn: () => getUsers(search),
  });
};
