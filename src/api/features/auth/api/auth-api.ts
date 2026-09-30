import { apiClient } from '@/api/client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export async function login(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    '/auth/login',
    payload,
  );

  return response.data;
}

export async function register(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    '/auth/register',
    payload,
  );

  return response.data;
}


export async function logout(): Promise<void> {
  const response = await apiClient.post('/auth/logout');
  return response.data;
}