import { useSuspenseQuery } from '@tanstack/react-query';

import { getBookmarks } from '../../api';

export const useGetBookmarks = () => {
  return useSuspenseQuery({ queryFn: getBookmarks, queryKey: ['bookmarks'] });
};
