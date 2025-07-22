import { API_URL, apiClient } from '@/shared';

import { GetMessagesDto, PinMessageDto, SendMessageDto, UnpinMessageDto } from './dto';

export const getMessages = async (chatid: number) => {
  const response = await apiClient.get<GetMessagesDto>(`${API_URL}/chats/${chatid}/messages`);

  return response.data;
};

type SendMessageParams = {
  chatId: number;
  text?: string;
  images?: File[];
};

export const sendMessage = async (params: SendMessageParams) => {
  const { chatId, images, ...data } = params;

  const formData = new FormData();

  Object.entries(data).forEach(([k, v]) => formData.append(k, v));
  images?.map((img) => formData.append('images', img));

  const response = await apiClient.post<SendMessageDto>(
    `${API_URL}/chats/${chatId}/messages`,
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

  const response = await apiClient.patch(`${API_URL}/chats/${chatId}/messages/${messageId}`, {
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
  const response = await apiClient.delete(`${API_URL}/chats/${chatId}/messages/${messageId}`);

  return response.data;
};

type ReplyMessageParams = {
  chatId: number;
  messageId: number;
  text: string;
};

export const replyMessage = async (params: ReplyMessageParams) => {
  const { chatId, messageId, ...data } = params;

  const result = await apiClient.post(
    `${API_URL}/chats/${chatId}/messages/${messageId}/reply`,
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

  const result = await apiClient.post(
    `${API_URL}/chats/${chatId}/messages/${messageId}/forward`,
    data
  );

  return result.data;
};

type PinMessageParams = { chatId: number; messageId: number };

export const pinMessage = async (params: PinMessageParams) => {
  const { chatId, messageId } = params;

  const result = await apiClient.patch<PinMessageDto>(
    `${API_URL}/chats/${chatId}/messages/${messageId}/pin`
  );

  return result.data;
};

type UnpinMessageParams = { chatId: number; messageId: number };

export const unpinMessage = async (params: UnpinMessageParams) => {
  const { chatId, messageId } = params;

  const result = await apiClient.patch<UnpinMessageDto>(
    `${API_URL}/chats/${chatId}/messages/${messageId}/unpin`
  );

  return result.data;
};
