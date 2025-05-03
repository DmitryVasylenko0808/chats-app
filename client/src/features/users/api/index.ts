import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';

import { GetUserDto } from './dto/get-user.dto';

export const getUser = async (id: number | null) => {
  const response = await axiosInstance.get<GetUserDto>(`${apiUrl}/users/${id}`);

  return response.data;
};

export type UpdateUserParams = {
  id: number;
  username: string;
  name: string;
  email: string;
  description?: string;
};

export const updateUser = async (data: UpdateUserParams) => {
  const { id, ...updateData } = data;

  const formData = new FormData();

  Object.entries(updateData).forEach(([k, v]) => formData.append(k, v));

  const response = await axiosInstance.patch(`${apiUrl}/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
