import { addBookmark } from '@/entities/bookmark';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
};
