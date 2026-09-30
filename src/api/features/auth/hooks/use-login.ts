import { useMutation } from '@tanstack/react-query';

import {
  login,
  type LoginPayload,
} from '@/api/features/auth/api/auth-api';

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
}