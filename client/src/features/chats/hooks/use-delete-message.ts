import { useMutation } from '@tanstack/react-query';

import { deleteMessage } from '../api';

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: deleteMessage,
  });
};
