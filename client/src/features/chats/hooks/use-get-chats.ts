import { useQuery } from '@tanstack/react-query';

import { getChats } from '../api';

export const useGetChats = (userId?: number) => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: () => getChats(userId),
    enabled: !!userId,
  });
};
