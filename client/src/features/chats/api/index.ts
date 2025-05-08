import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';

import { CreateChatDto } from './dto/create-chat.dto';
import { GetChatDto } from './dto/get-chat.dto';
import { GetChatsDto } from './dto/get-chats.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { SendMessageDto } from './dto/send-message.dto';

export const getChats = async (userId?: number) => {
  const response = await axiosInstance.get<GetChatsDto>(`${apiUrl}/users/${userId}/chats`);

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

export const getMessages = async (chatid: number) => {
  const response = await axiosInstance.get<GetMessagesDto>(`${apiUrl}/chats/${chatid}/messages`);

  return response.data;
};

type SendMessageParams = {
  chatId: number;
  text: string;
  senderId?: number;
};

export const sendMessage = async (data: SendMessageParams) => {
  const { chatId } = data;

  const response = await axiosInstance.post<SendMessageDto>(
    `${apiUrl}/chats/${chatId}/messages`,
    data
  );

  return response.data;
};
