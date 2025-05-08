import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMessage } from '../api';

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      queryClient.invalidateQueries({ queryKey: ['messages', params.chatId] });
    },
  });
};
