import { useMutation } from '@tanstack/react-query';

import { logout } from '@/api/features/auth/api/auth-api';

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}