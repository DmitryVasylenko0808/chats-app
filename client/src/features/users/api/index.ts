import { axiosInstance } from '@/config/axios.config';
import { apiUrl } from '@/config/contants';

import { GetUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export const getUsers = async (search?: string) => {
  const response = await axiosInstance.get<GetUsersDto>(`${apiUrl}/users`, {
    params: { search },
  });

  return response.data;
};

export const getUser = async (id?: number | null) => {
  const response = await axiosInstance.get<GetUserDto>(`${apiUrl}/users/${id}`);

  return response.data;
};

export type UpdateUserParams = {
  id: number;
  username: string;
  name: string;
  email: string;
  description?: string;
  avatar?: File;
};

export const updateUser = async (data: UpdateUserParams) => {
  const { id, ...updateData } = data;

  const formData = new FormData();

  Object.entries(updateData).forEach(([k, v]) => formData.append(k, v));

  const response = await axiosInstance.patch<UpdateUserDto>(`${apiUrl}/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deleteUser = async (id: number | null) => {
  const response = await axiosInstance.delete(`${apiUrl}/users/${id}`);

  return response.data;
};
