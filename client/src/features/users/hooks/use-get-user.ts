import { useQuery } from '@tanstack/react-query';

import { getUser } from '../api';

export const useGetUser = (id: number | null) => {
  return useQuery({ queryKey: ['users', id], queryFn: () => getUser(id) });
};
