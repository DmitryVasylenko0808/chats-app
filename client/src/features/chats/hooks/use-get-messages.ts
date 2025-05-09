import { placeholderAvatarUrl, serverAvatarsUrl } from '@/config/contants';
import { useQuery } from '@tanstack/react-query';

import { getMessages } from '../api';

export const useGetMessages = (chatId: number) => {
  return useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => getMessages(chatId),
    select: (data) => {
      return data.map((message) => ({
        ...message,
        sender: {
          ...message.sender,
          avatar: message.sender?.avatar
            ? `${serverAvatarsUrl}/${message.sender?.avatar}`
            : placeholderAvatarUrl,
        },
      }));
    },
  });
};
