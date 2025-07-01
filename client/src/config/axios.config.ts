import axios from 'axios';

import { webStorage } from './web-storage';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((cfg) => {
  const accessToken = webStorage.getItem('access_token');

  cfg.headers.Authorization = `Bearer ${accessToken}`;

  return cfg;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(
        new Error(error.response?.data?.message || 'Ooopss... something went wrong')
      );
    }

    return Promise.reject(new Error('Ooopss... something went wrong'));
  }
);

export { axiosInstance };
