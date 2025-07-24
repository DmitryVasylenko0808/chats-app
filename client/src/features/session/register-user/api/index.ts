import { API_URL, apiClient } from '@/shared';

export type RegisterUserParams = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export const registerUser = async (data: RegisterUserParams) => {
  const response = await apiClient.post(`${API_URL}/auth/register`, data);

  return response.data;
};
