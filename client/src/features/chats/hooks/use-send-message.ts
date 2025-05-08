import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sendMessage } from '../api';

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      queryClient.invalidateQueries({ queryKey: ['messages', data.chatId] });
    },
  });
};
