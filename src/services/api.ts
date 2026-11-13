import { create, type AxiosError } from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com';

export const apiClient = create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }
    // Siempre rechazar para que TanStack Query capture el error
    return Promise.reject(error);
  },
);
