import { API_URL, apiClient } from '@/shared';

import { GetUserDto, GetUsersDto, UpdateUserDto } from './dto';

export const getUsers = async (search?: string) => {
  const response = await apiClient.get<GetUsersDto>(`${API_URL}/users`, {
    params: { search },
  });

  return response.data;
};

export const getUser = async (id?: number | null) => {
  const response = await apiClient.get<GetUserDto>(`${API_URL}/users/${id}`);

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

  const response = await apiClient.patch<UpdateUserDto>(`${API_URL}/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deleteUser = async (id?: number | null) => {
  const response = await apiClient.delete(`${API_URL}/users/${id}`);

  return response.data;
};
