import { serverAvatarsUrl } from '@/config/contants';
import { useQuery } from '@tanstack/react-query';

import { getUsers } from '../api';

export const useGetUsers = (search?: string) => {
  return useQuery({
    queryKey: ['users', search],
    queryFn: () => getUsers(search),
    select: (data) => data.map((u) => ({ ...u, avatar: `${serverAvatarsUrl}/${u.avatar}` })),
  });
};
