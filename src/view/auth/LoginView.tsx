import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';

import { useLogin } from '@/api/features/auth/hooks/use-login';
import AppButton from '@/components/common/AppButton';
import FormInput from '@/components/forms/FormInput';
import { useAuth } from '@/context/auth/auth-provider';
import { useSnackbar } from '@/context/snackbar/snackbar-provider';
import {
  loginSchema,
  type LoginFormValues,
} from '@/schemas/auth/login-schema';
import { router } from 'expo-router';

export default function LoginView() {
  const theme = useTheme();

  const { login: saveSession } = useAuth();
  const { mutateAsync: loginUser, isPending } = useLogin();
  const { showSnackbar } = useSnackbar();

  const [isPasswordVisible, setIsPasswordVisible] =
    useState(false);

  const { control, handleSubmit } =
    useForm<LoginFormValues>({
      resolver: yupResolver(loginSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginUser(data);

      if (
        response?.accessToken &&
        response?.refreshToken &&
        response?.user
      ) {
        await saveSession(
          response.accessToken,
          response.refreshToken,
          response.user,
        );

        showSnackbar({
          message: 'Login successful',
          icon: 'check-circle',
        });

        return;
      }

      showSnackbar({
        message: 'Invalid login response',
        icon: 'alert-circle',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ??
          'Login failed';

        showSnackbar({
          message,
          icon: 'alert-circle',
        });

        return;
      }

      showSnackbar({
        message: 'Something went wrong',
        icon: 'alert-circle',
      });
    }
  };

  const backgroundImage = theme.dark
    ? require('@/assets/images/login-dark.png')
    : require('@/assets/images/login-light.png');

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: theme.dark
              ? 'rgba(5, 8, 25, 0.18)'
              : 'rgba(255, 255, 255, 0.08)',
          },
        ]}
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === 'ios' ? 'padding' : 'height'
        }
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.hero}>
            <Text
              variant="displaySmall"
              style={[
                styles.brand,
                {
                  color: theme.dark
                    ? '#FFFFFF'
                    : '#172554',
                },
              ]}
            >
              Shoply
            </Text>

            <Text
              variant="headlineSmall"
              style={[
                styles.heroTitle,
                {
                  color: theme.dark
                    ? '#FFFFFF'
                    : '#172554',
                },
              ]}
            >
              Better Products{'\n'}Happier You
            </Text>

            <Text
              variant="bodyLarge"
              style={[
                styles.heroSubtitle,
                {
                  color: theme.dark
                    ? 'rgba(255,255,255,0.78)'
                    : 'rgba(23,37,84,0.72)',
                },
              ]}
            >
              Discover amazing products,{'\n'}
              deals and more — all in one place.
            </Text>
          </View>

          {/* Login Card */}
          <Surface
            elevation={5}
            style={[
              styles.loginCard,
              {
                backgroundColor: theme.dark
                  ? 'rgba(17, 24, 50, 0.94)'
                  : 'rgba(255, 255, 255, 0.94)',
              },
            ]}
          >
            <View style={styles.header}>
              <Text
                variant="headlineMedium"
                style={[
                  styles.title,
                  {
                    color: theme.colors.onSurface,
                  },
                ]}
              >
                Welcome Back 👋
              </Text>

              <Text
                variant="bodyMedium"
                style={[
                  styles.subtitle,
                  {
                    color:
                      theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                Login to continue your shopping journey
              </Text>
            </View>

            <View style={styles.form}>
              <FormInput
                control={control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                icon="email-outline"
              />

              <FormInput
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry={!isPasswordVisible}
                icon={
                  isPasswordVisible
                    ? 'eye-off-outline'
                    : 'eye-outline'
                }
                onIconPress={() =>
                  setIsPasswordVisible(
                    previous => !previous,
                  )
                }
              />

              <AppButton
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                style={styles.loginButton}
                contentStyle={styles.loginButtonContent}
                disabled={isPending}
                loading={isPending}
              >
                Login
              </AppButton>

              <Text
                variant="bodyMedium"
                style={[
                  styles.registerText,
                  {
                    color:
                      theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                Don't have an account?{' '}
                <Text
                  style={[
                    styles.registerLink,
                    {
                      color: theme.colors.primary,
                    },
                  ]}
                  onPress={() => router.push('/(auth)/register')}
                >
                  Register
                </Text>
              </Text>
            </View>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
  },

  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 28,
    marginBottom: 28,
    justifyContent: 'space-between',
  },

  hero: {
    paddingHorizontal: 8,
    marginBottom: 35,
  },

  brand: {
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 20,
  },

  heroTitle: {
    fontWeight: '800',
    lineHeight: 36,
    letterSpacing: -0.8,
    marginBottom: 12,
  },

  heroSubtitle: {
    lineHeight: 23,
  },

  loginCard: {
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 24,

    // Glass-like appearance
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',

    overflow: 'hidden',
  },

  header: {
    marginBottom: 22,
  },

  title: {
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 7,
  },

  subtitle: {
    lineHeight: 21,
  },

  form: {
    gap: 4,
  },

  loginButton: {
    marginTop: 14,
    borderRadius: 16,
  },

  loginButtonContent: {
    height: 54,
  },

  registerText: {
    textAlign: 'center',
    marginTop: 18,
  },

  registerLink: {
    fontWeight: '700',
  },
});