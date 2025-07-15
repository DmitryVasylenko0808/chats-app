import { useQuery } from '@tanstack/react-query';

import { getChats } from '../api';

export const useGetChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: getChats,
  });
};
