import { useLogout } from '@/api/features/auth/hooks/use-logout';
import AppButton from '@/components/common/AppButton';
import AppText from '@/components/common/AppText';
import { useAuth } from '@/context/auth/auth-provider';
import { View } from 'react-native';

const HomeView = () => {
  const { logout: clearSession } = useAuth();
  const { mutateAsync: logoutUser, isPending } = useLogout();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      console.log('res: ', res);
    } catch (error) {
      console.log('Logout API failed:', error);
    } finally {
      await clearSession();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AppText>HomeView</AppText>

      <AppButton
        mode="outlined"
        icon="logout"
        onPress={handleLogout}
        loading={isPending}
        disabled={isPending}
      >
        Logout
      </AppButton>
    </View>
  );
};

export default HomeView;