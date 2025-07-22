import { useMutation } from '@tanstack/react-query';

import { editMessage } from '../../../entities/message/api';

export const useEditMessage = () => {
  return useMutation({
    mutationFn: editMessage,
  });
};
