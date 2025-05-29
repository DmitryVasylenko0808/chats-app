import { useMutation } from '@tanstack/react-query';

import { pinMessage } from '../api';

export const usePinMessage = () => {
  return useMutation({ mutationFn: pinMessage });
};
