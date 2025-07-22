import { useQuery } from '@tanstack/react-query';

import { getMessages } from '../../api';

export const useGetMessages = (chatId: number) => {
  return useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => getMessages(chatId),
  });
};
