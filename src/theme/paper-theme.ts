import {
  MD3DarkTheme,
  MD3LightTheme,
  type MD3Theme,
} from 'react-native-paper';

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  fonts: MD3LightTheme.fonts,
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  fonts: MD3DarkTheme.fonts,
};