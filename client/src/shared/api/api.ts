import { API_URL } from '../config/constants';
import { apiClient } from './api-client';
import { GetMeDto } from './dto';

export const getMe = async () => {
  const response = await apiClient.get<GetMeDto>(`${API_URL}/auth/me`);

  return response.data;
};
