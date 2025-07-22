import { getUser } from '@/entities/user';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = (id?: number | null) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => getUser(id),
  });
};
