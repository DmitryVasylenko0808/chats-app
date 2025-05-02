import axios from 'axios';

const axiosInstance = axios.create();

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
