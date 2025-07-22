import { apiClient } from '@/shared';
import { API_URL } from '@/shared';

type AddReactionParams = { messageId: number; emoji: string };

export const addReaction = async (params: AddReactionParams) => {
  const { messageId, ...data } = params;

  const result = await apiClient.post(`${API_URL}/messages/${messageId}/reactions`, data);

  return result.data;
};

type DeleteReactionParams = { messageId: number; emoji: string };

export const deleteReaction = async (params: DeleteReactionParams) => {
  const { messageId, ...data } = params;

  const result = await apiClient.delete(`${API_URL}/messages/${messageId}/reactions`, { data });

  return result.data;
};
