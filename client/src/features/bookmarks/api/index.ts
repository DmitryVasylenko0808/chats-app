import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';

import { AddBookmarkDto, DeleteBookmarkDto, GetBookmarksDto } from './dto';

export const getBookmarks = async () => {
  const response = await axiosInstance.get<GetBookmarksDto>(`${apiUrl}/bookmarks`);

  return response.data;
};

type AddBookmarkParams = { messageId: number };

export const addBookmark = async (params: AddBookmarkParams) => {
  const response = await axiosInstance.post<AddBookmarkDto>(`${apiUrl}/bookmarks`, params);

  return response.data;
};

type DeleteBookmarkParams = { id?: number };

export const deleteBookmark = async (params: DeleteBookmarkParams) => {
  const response = await axiosInstance.delete<DeleteBookmarkDto>(
    `${apiUrl}/bookmarks/${params.id}`
  );

  return response.data;
};
