import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';

import { GetUserDto } from './dto/get-user.dto';

export const getUser = async (id: number | null) => {
  const response = await axiosInstance.get<GetUserDto>(`${apiUrl}/users/${id}`);

  return response.data;
};
