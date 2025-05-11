import { useMutation } from '@tanstack/react-query';

import { editMessage } from '../api';

export const useEditMessage = () => {
  return useMutation({
    mutationFn: editMessage,
  });
};
