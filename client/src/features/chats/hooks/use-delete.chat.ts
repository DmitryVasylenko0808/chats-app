import { useMutation } from '@tanstack/react-query';

import { deleteChatById } from '../api';

export const useDeleteChat = () => {
  return useMutation({
    mutationFn: deleteChatById,
  });
};
