import { API_URL, apiClient } from '@/shared';

import { CreateChatDto, GetChatDto, GetChatsDto } from './dto';

export const getChats = async () => {
  const response = await apiClient.get<GetChatsDto>(`${API_URL}/chats`);

  return response.data;
};

export const getChatById = async (id?: number) => {
  const response = await apiClient.get<GetChatDto>(`${API_URL}/chats/${id}`);

  return response.data;
};

export const createChat = async (membersIds: number[]) => {
  const response = await apiClient.post<CreateChatDto>(`${API_URL}/chats`, { membersIds });

  return response.data;
};

export const deleteChatById = async (id: number) => {
  const response = await apiClient.delete(`${API_URL}/chats/${id}`);

  return response.data;
};
