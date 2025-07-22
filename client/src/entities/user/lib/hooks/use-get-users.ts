import { getUsers } from '@/entities/user';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = (search?: string) => {
  return useQuery({
    queryKey: ['users', search],
    queryFn: () => getUsers(search),
  });
};
