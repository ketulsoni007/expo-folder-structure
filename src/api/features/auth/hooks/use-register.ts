import { useMutation } from '@tanstack/react-query';

import {
    register,
    type RegisterPayload,
} from '@/api/features/auth/api/auth-api';

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });
}