import { API_URL, apiClient } from '@/shared';

import { SignInUserDto } from './dto';

export type SignInUserParams = {
  username: string;
  password: string;
};

export const signInUser = async (data: SignInUserParams) => {
  const response = await apiClient.post<SignInUserDto>(`${API_URL}/auth/sign-in`, data);

  return response.data;
};
