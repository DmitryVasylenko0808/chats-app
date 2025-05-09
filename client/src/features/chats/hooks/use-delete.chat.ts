import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteChatById } from '../api';
import { useCurrentChatStore } from '../store';

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const { reset } = useCurrentChatStore();

  return useMutation({
    mutationFn: deleteChatById,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
};
