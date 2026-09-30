import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from '@/auth/secure-storage';

import {
  clearUser,
  getUser,
  saveUser,
} from '@/auth/user-storage';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    accessToken: string,
    refreshToken: string,
    user: AuthUser,
  ) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<
  AuthContextValue | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(
    null,
  );

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const accessToken = await getAccessToken();
        const refreshToken = await getRefreshToken();
        const savedUser = await getUser();

        if (
          accessToken &&
          refreshToken &&
          savedUser
        ) {
          setUser(savedUser);
          setIsAuthenticated(true);
        }
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(
    accessToken: string,
    refreshToken: string,
    user: AuthUser,
  ) {
    await saveTokens(
      accessToken,
      refreshToken,
    );

    await saveUser(user);

    setUser(user);
    setIsAuthenticated(true);
  }

  async function logout() {
    await clearTokens();
    await clearUser();

    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider',
    );
  }

  return context;
}