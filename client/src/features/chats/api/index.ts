import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';

import { GetChatsDto } from './dto/get-chats.dto';

export const getChats = async (userId?: number) => {
  const response = await axiosInstance.get<GetChatsDto>(`${apiUrl}/users/${userId}/chats`);

  return response.data;
};
