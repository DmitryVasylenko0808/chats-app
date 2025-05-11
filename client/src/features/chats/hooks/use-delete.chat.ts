import { useMutation } from '@tanstack/react-query';

import { deleteChatById } from '../api';
import { useCurrentChatStore } from '../store';

export const useDeleteChat = () => {
  const { reset } = useCurrentChatStore();

  return useMutation({
    mutationFn: deleteChatById,
    onSuccess: () => {
      reset();
    },
  });
};
