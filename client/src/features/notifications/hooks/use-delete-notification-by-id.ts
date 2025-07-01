import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNotificationById } from '../api';

export const useDeleteNotificationById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotificationById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });
};
