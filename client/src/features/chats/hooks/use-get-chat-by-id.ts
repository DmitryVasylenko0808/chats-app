import { serverAvatarsUrl } from '@/config/contants';
import { useQuery } from '@tanstack/react-query';

import { getChatById } from '../api';

export const useGetChatById = (id?: number) => {
  return useQuery({
    queryKey: ['chats', id],
    queryFn: () => getChatById(id),
    select: (data) => ({
      ...data,
      members: data.members.map((m) => ({ ...m, avatar: `${serverAvatarsUrl}/${m.avatar}` })),
    }),
  });
};
