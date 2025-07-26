import { getUser } from '@/entities/user';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetUser = (id?: number | null) => {
  return useSuspenseQuery({
    queryKey: ['users', id],
    queryFn: () => getUser(id),
  });
};
