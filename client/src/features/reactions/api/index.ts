import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';

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
