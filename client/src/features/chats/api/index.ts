import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';

import { CreateChatDto, GetChatDto, GetChatsDto, GetMessagesDto, SendMessageDto } from './dto';

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
};

export const sendMessage = async (params: SendMessageParams) => {
  const { chatId, ...data } = params;

  const formData = new FormData();

  Object.entries(data).forEach(([k, v]) => formData.append(k, v));

  const response = await axiosInstance.post<SendMessageDto>(
    `${apiUrl}/chats/${chatId}/messages`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

type EditMessageParams = {
  chatId: number;
  messageId: number;
  text: string;
};

export const editMessage = async (params: EditMessageParams) => {
  const { chatId, messageId, ...data } = params;

  const response = await axiosInstance.patch(`${apiUrl}/chats/${chatId}/messages/${messageId}`, {
    chatId,
    ...data,
  });

  return response.data;
};

type DeleteMessageParams = {
  chatId: number;
  messageId: number;
};

export const deleteMessage = async ({ chatId, messageId }: DeleteMessageParams) => {
  const response = await axiosInstance.delete(`${apiUrl}/chats/${chatId}/messages/${messageId}`);

  return response.data;
};

type ReplyMessageParams = {
  chatId: number;
  messageId: number;
  text: string;
};

export const replyMessage = async (params: ReplyMessageParams) => {
  const { chatId, messageId, ...data } = params;

  const result = await axiosInstance.post(
    `${apiUrl}/chats/${chatId}/messages/${messageId}/reply`,
    data
  );

  return result.data;
};

type ForwardMessageParams = {
  chatId: number;
  messageId: number;
  targetChatId: number;
};

export const forwardMessage = async (params: ForwardMessageParams) => {
  const { chatId, messageId, ...data } = params;

  const result = await axiosInstance.post(
    `${apiUrl}/chats/${chatId}/messages/${messageId}/forward`,
    data
  );

  return result.data;
};
