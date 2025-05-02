import { axiosInstance } from '@/config/axios.config';

export type RegisterUserParams = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export const registerUser = async (data: RegisterUserParams) => {
  const response = await axiosInstance.post('http://localhost:4444/api/auth/register', data);

  return response.data;
};

export type SignInUserParams = {
  username: string;
  password: string;
};

export const signInUser = async (data: SignInUserParams) => {
  const response = await axiosInstance.post('http://localhost:4444/api/auth/sign-in', data);

  return response.data;
};
