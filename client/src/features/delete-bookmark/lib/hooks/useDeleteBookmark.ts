import { deleteBookmark } from '@/entities/bookmark';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};
