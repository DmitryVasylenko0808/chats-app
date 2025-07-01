import { useMutation, useQueryClient } from '@tanstack/react-query';

import { markAsReadNotification } from '../api';

export const useMarkNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsReadNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });
};
