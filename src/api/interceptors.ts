import {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

import { apiClient } from '@/api/client';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from '@/auth/secure-storage';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | RetryableRequestConfig
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Do not refresh for authentication endpoints
    if (
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      await clearTokens();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await apiClient.post(
        '/auth/refresh',
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      const {
        accessToken,
        refreshToken: newRefreshToken,
      } = response.data;

      await saveTokens(accessToken, newRefreshToken);

      originalRequest.headers.Authorization =
        `Bearer ${accessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      await clearTokens();

      return Promise.reject(refreshError);
    }
  },
);