import { useMutation } from '@tanstack/react-query';

import { unpinMessage } from '../api';

export const useUnpinMessage = () => {
  return useMutation({ mutationFn: unpinMessage });
};
