import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'system' | 'light' | 'dark';

const THEME_MODE_KEY = 'theme_mode';

export async function saveThemeMode(
  themeMode: ThemeMode,
): Promise<void> {
  await AsyncStorage.setItem(THEME_MODE_KEY, themeMode);
}

export async function getThemeMode(): Promise<ThemeMode | null> {
  const value = await AsyncStorage.getItem(THEME_MODE_KEY);

  if (value === 'system' || value === 'light' || value === 'dark') {
    return value;
  }

  return null;
}