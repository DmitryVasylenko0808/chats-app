import { axiosInstance } from '@/config/axios.config';

type RegisterUserParams = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export const registerUser = async (data: RegisterUserParams) => {
  const response = await axiosInstance.post('http://localhost:4444/api/auth/register', data);

  return response.data;
};
