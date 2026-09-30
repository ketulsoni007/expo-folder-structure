import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useColorScheme } from 'react-native';

import {
    getThemeMode,
    saveThemeMode,
    type ThemeMode,
} from '@/context/theme/theme-storage';

interface ThemeContextValue {
  themeMode: ThemeMode;
  colorScheme: 'light' | 'dark';
  isLoading: boolean;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
}

const ThemeContext = createContext<
  ThemeContextValue | undefined
>(undefined);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const systemColorScheme = useColorScheme();

  const [themeMode, setThemeModeState] =
    useState<ThemeMode>('system');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedThemeMode = await getThemeMode();

        if (savedThemeMode) {
          setThemeModeState(savedThemeMode);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadTheme();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await saveThemeMode(mode);
  };

  const colorScheme =
    themeMode === 'system'
      ? systemColorScheme === 'dark'
        ? 'dark'
        : 'light'
      : themeMode;

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        colorScheme,
        isLoading,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useThemeMode must be used inside ThemeProvider',
    );
  }

  return context;
}