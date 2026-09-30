import AsyncStorage from '@react-native-async-storage/async-storage';

import type { AuthUser } from '@/context/auth/auth-provider';

const AUTH_USER_KEY = 'auth_user';

export async function saveUser(
  user: AuthUser,
): Promise<void> {
  await AsyncStorage.setItem(
    AUTH_USER_KEY,
    JSON.stringify(user),
  );
}

export async function getUser(): Promise<AuthUser | null> {
  const value = await AsyncStorage.getItem(
    AUTH_USER_KEY,
  );

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    return null;
  }
}

export async function clearUser(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_USER_KEY);
}