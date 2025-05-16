import { serverUploadssUrl } from '@/config/contants';
import { useQuery } from '@tanstack/react-query';

import { getChats } from '../api';

export const useGetChats = (userId?: number) => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: () => getChats(userId),
    select: (data) => {
      const transformedData = data.map((chat) => ({
        ...chat,
        members: chat.members.map((m) => ({ ...m, avatar: `${serverUploadssUrl}/${m.avatar}` })),
      }));

      return transformedData;
    },
    enabled: !!userId,
  });
};
