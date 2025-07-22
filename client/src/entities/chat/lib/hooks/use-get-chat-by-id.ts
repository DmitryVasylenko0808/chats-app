import { useQuery } from '@tanstack/react-query';

import { getChatById } from '../../api';

export const useGetChatById = (id?: number) => {
  return useQuery({
    queryKey: ['chats', id],
    queryFn: () => getChatById(id),
  });
};
