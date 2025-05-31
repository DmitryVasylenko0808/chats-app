import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';

import {
  CreateChatDto,
  GetChatDto,
  GetChatsDto,
  GetMessagesDto,
  PinMessageDto,
  SendMessageDto,
  UnpinMessageDto,
} from './dto';

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
  images?: File[];
};

export const sendMessage = async (params: SendMessageParams) => {
  const { chatId, images, ...data } = params;

  const formData = new FormData();

  Object.entries(data).forEach(([k, v]) => formData.append(k, v));
  images?.map((img) => formData.append('images', img));

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

type PinMessageParams = { chatId: number; messageId: number };

export const pinMessage = async (params: PinMessageParams) => {
  const { chatId, messageId } = params;

  const result = await axiosInstance.patch<PinMessageDto>(
    `${apiUrl}/chats/${chatId}/messages/${messageId}/pin`
  );

  return result.data;
};

type UnpinMessageParams = { chatId: number; messageId: number };

export const unpinMessage = async (params: UnpinMessageParams) => {
  const { chatId, messageId } = params;

  const result = await axiosInstance.patch<UnpinMessageDto>(
    `${apiUrl}/chats/${chatId}/messages/${messageId}/unpin`
  );

  return result.data;
};

type AddReactionParams = { messageId: number; emoji: string };

export const addReaction = async (params: AddReactionParams) => {
  const { messageId, ...data } = params;

  const result = await axiosInstance.post(`${apiUrl}/messages/${messageId}/reactions`, data);

  return result.data;
};

type DeleteReactionParams = { messageId: number; emoji: string };

export const deleteReaction = async (params: DeleteReactionParams) => {
  const { messageId, ...data } = params;

  const result = await axiosInstance.delete(`${apiUrl}/messages/${messageId}/reactions`, { data });

  return result.data;
};
