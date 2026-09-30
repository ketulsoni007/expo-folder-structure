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
  useTheme,
} from 'react-native-paper';

import { useRegister } from '@/api/features/auth/hooks/use-register';
import AppButton from '@/components/common/AppButton';
import AppText from '@/components/common/AppText';
import FormInput from '@/components/forms/FormInput';
import { useAuth } from '@/context/auth/auth-provider';
import { useSnackbar } from '@/context/snackbar/snackbar-provider';
import {
  registerSchema,
  type RegisterFormValues,
} from '@/schemas/auth/register-schema';
import { router } from 'expo-router';

export default function RegisterView() {
  const theme = useTheme();
  const { login: saveSession } = useAuth();

  const { mutateAsync: registerUser, isPending } =
    useRegister();

  const { showSnackbar } = useSnackbar();

  const [isPasswordVisible, setIsPasswordVisible] =
    useState(false);

  const { control, handleSubmit } =
    useForm<RegisterFormValues>({
      resolver: yupResolver(registerSchema),
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
    });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await registerUser(data);

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
          message: 'Register successful',
          icon: 'check-circle',
        });

        return;
      }

      showSnackbar({
        message: 'Invalid register response',
        icon: 'alert-circle',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ??
          'Register failed';

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
    ? require('@/assets/images/register-dark.png')
    : require('@/assets/images/register-light.png');

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
              ? 'rgba(5, 8, 25, 0.16)'
              : 'rgba(255, 255, 255, 0.06)',
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
            <AppText
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
            </AppText>

            <AppText
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
              Create Your{'\n'}Account
            </AppText>

            <AppText
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
              Join Shoply and start exploring{'\n'}
              amazing products and exclusive deals.
            </AppText>
          </View>


          <Surface
            elevation={5}
            style={[
              styles.registerCard,
              {
                backgroundColor: theme.dark
                  ? 'rgba(17, 24, 50, 0.94)'
                  : 'rgba(255, 255, 255, 0.94)',
              },
            ]}
          >
            <View style={styles.header}>
              <AppText
                variant="headlineMedium"
                style={[
                  styles.title,
                  {
                    color: theme.colors.onSurface,
                  },
                ]}
              >
                Let's get started ✨
              </AppText>

              <AppText
                variant="bodyMedium"
                style={[
                  styles.subtitle,
                  {
                    color:
                      theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                Create your account to begin shopping
              </AppText>
            </View>

            <View style={styles.form}>

              <View style={styles.nameRow}>
                <View style={styles.nameInput}>
                  <FormInput
                    control={control}
                    name="firstName"
                    label="First Name"
                    placeholder="First name"
                    autoCapitalize="words"
                    autoCorrect={false}
                    icon="account-outline"
                  />
                </View>

                <View style={styles.nameInput}>
                  <FormInput
                    control={control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Last name"
                    autoCapitalize="words"
                    autoCorrect={false}
                    icon="account-outline"
                  />
                </View>
              </View>


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
                placeholder="Create a strong password"
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
                style={styles.registerButton}
                contentStyle={styles.registerButtonContent}
                disabled={isPending}
                loading={isPending}
              >
                Create Account
              </AppButton>


              <AppText
                variant="bodyMedium"
                style={[
                  styles.loginText,
                  {
                    color:
                      theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                Already have an account?{' '}
                <AppText
                  style={[
                    styles.loginLink,
                    {
                      color: theme.colors.primary,
                    },
                  ]}
                  onPress={() => router.push('/(auth)/login')}
                >
                  Login
                </AppText>
              </AppText>
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
    paddingTop: 65,
    paddingBottom: 28,
    marginBottom: 28,
    justifyContent: 'space-between',
  },

  hero: {
    paddingHorizontal: 8,
    marginBottom: 28,
  },

  brand: {
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 18,
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

  registerCard: {
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 24,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',

    overflow: 'hidden',
  },

  header: {
    marginBottom: 18,
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
    gap: 3,
  },

  nameRow: {
    flexDirection: 'row',
    gap: 10,
  },

  nameInput: {
    flex: 1,
  },

  registerButton: {
    marginTop: 14,
    borderRadius: 16,
  },

  registerButtonContent: {
    height: 54,
  },

  loginText: {
    textAlign: 'center',
    marginTop: 18,
  },

  loginLink: {
    fontWeight: '700',
  },
});