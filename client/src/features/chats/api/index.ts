import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';

import { CreateChatDto, GetChatDto, GetChatsDto } from './dto';

export const getChats = async () => {
  const response = await axiosInstance.get<GetChatsDto>(`${apiUrl}/chats`);

  return response.data;
};

export const getChatById = async (id?: number) => {
  const response = await axiosInstance.get<GetChatDto>(`${apiUrl}/chats/${id}`);

  return response.data;
};

export const createChat = async (membersIds: number[]) => {
  const response = await axiosInstance.post<CreateChatDto>(`${apiUrl}/chats`, { membersIds });

  return response.data;
};

export const deleteChatById = async (id: number) => {
  const response = await axiosInstance.delete(`${apiUrl}/chats/${id}`);

  return response.data;
};
