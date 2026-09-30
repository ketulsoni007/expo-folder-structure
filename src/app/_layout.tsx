import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RouterThemeProvider,
} from 'expo-router';

import { useThemeMode } from '@/context/theme/theme-provider';
import { RootNavigator } from '@/navigations/RootNavigator';
import { ProviderWrapper } from '@/providers/ProviderWrapper';

export default function RootLayout() {
  return (
    <ProviderWrapper>
      <ThemedRoot />
    </ProviderWrapper>
  );
}

function ThemedRoot() {
  const { colorScheme } = useThemeMode();

  return (
    <RouterThemeProvider
      value={
        colorScheme === 'dark'
          ? DarkTheme
          : DefaultTheme
      }
    >
      <RootNavigator />
    </RouterThemeProvider>
  );
}