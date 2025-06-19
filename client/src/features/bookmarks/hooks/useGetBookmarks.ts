import { useQuery } from '@tanstack/react-query';

import { getBookmarks } from '../api';

export const useGetBookmarks = () => {
  return useQuery({ queryFn: getBookmarks, queryKey: ['bookmarks'] });
};
