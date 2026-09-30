import '@/api/interceptors';

import { queryClient } from '@/api/query-client';
import { AuthProvider } from '@/context/auth/auth-provider';
import { I18nProvider } from '@/context/i18n/i18n-provider';
import { SnackbarProvider } from '@/context/snackbar/snackbar-provider';
import { ThemeProvider, useThemeMode } from '@/context/theme/theme-provider';
import { store } from '@/store';
import { darkTheme, lightTheme } from '@/theme/paper-theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

export function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ThemedProviders>
            {children}
          </ThemedProviders>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

function ThemedProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorScheme } = useThemeMode();

  return (
    <AuthProvider>
      <I18nProvider>
        <PaperProvider
          theme={
            colorScheme === 'dark'
              ? darkTheme
              : lightTheme
          }
          settings={{
            icon: (props) => (
              <MaterialCommunityIcons
                {...props}
                name={
                  props.name as React.ComponentProps<
                    typeof MaterialCommunityIcons
                  >['name']
                }
              />
            ),
          }}
        >
          <SnackbarProvider>
            {children}
          </SnackbarProvider>
        </PaperProvider>
      </I18nProvider>
    </AuthProvider>
  );
}