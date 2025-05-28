import { useMutation } from '@tanstack/react-query';

import { forwardMessage } from '../api';

export const useForwardMessage = () => {
  return useMutation({ mutationFn: forwardMessage });
};
