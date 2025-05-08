import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editMessage } from '../api';

export const useEditMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMessage,
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      queryClient.invalidateQueries({ queryKey: ['messages', params.chatId] });
    },
  });
};
