import { API_URL, apiClient } from '@/shared';

import { GetMeDto, SignInUserDto } from './dto';

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

export type SignInUserParams = {
  username: string;
  password: string;
};

export const signInUser = async (data: SignInUserParams) => {
  const response = await apiClient.post<SignInUserDto>(`${API_URL}/auth/sign-in`, data);

  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get<GetMeDto>(`${API_URL}/auth/me`);

  return response.data;
};
