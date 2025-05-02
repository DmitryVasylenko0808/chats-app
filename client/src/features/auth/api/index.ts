import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';

import { SignInUserDto } from './dto/sign-in-user.dto';

export type RegisterUserParams = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export const registerUser = async (data: RegisterUserParams) => {
  const response = await axiosInstance.post(`${apiUrl}/auth/register`, data);

  return response.data;
};

export type SignInUserParams = {
  username: string;
  password: string;
};

export const signInUser = async (data: SignInUserParams) => {
  const response = await axiosInstance.post<SignInUserDto>(`${apiUrl}/auth/sign-in`, data);

  return response.data;
};
