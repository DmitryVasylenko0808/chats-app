import { API_URL, apiClient } from '@/shared';

import { AddBookmarkDto, DeleteBookmarkDto, GetBookmarksDto } from './dto';

export const getBookmarks = async () => {
  const response = await apiClient.get<GetBookmarksDto>(`${API_URL}/bookmarks`);

  return response.data;
};

type AddBookmarkParams = { messageId: number };

export const addBookmark = async (params: AddBookmarkParams) => {
  const response = await apiClient.post<AddBookmarkDto>(`${API_URL}/bookmarks`, params);

  return response.data;
};

type DeleteBookmarkParams = { id?: number };

export const deleteBookmark = async (params: DeleteBookmarkParams) => {
  const response = await apiClient.delete<DeleteBookmarkDto>(`${API_URL}/bookmarks/${params.id}`);

  return response.data;
};
