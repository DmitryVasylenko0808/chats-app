import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteChatById } from '../api';
import { useCurrentChatStore } from '../store';

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const { reset } = useCurrentChatStore();
  const { mutateAsync, mutate, ...mutationResult } = useMutation({
    mutationFn: deleteChatById,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });

  const deleteChat = (id: number) => mutateAsync(id);

  return { deleteChat, ...mutationResult };
};
