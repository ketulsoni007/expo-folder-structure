import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tab)/home',
};

export default function AppLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}