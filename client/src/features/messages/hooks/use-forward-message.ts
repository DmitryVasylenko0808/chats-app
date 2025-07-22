import { useMutation } from '@tanstack/react-query';

import { forwardMessage } from '../../../entities/message/api';

export const useForwardMessage = () => {
  return useMutation({ mutationFn: forwardMessage });
};
