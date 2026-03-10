import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  authLoading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = '@authapp_user';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // For this demo app we keep a single in-memory "database" user.
  const [storedCredentials, setStoredCredentials] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedUserJson = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedUserJson) {
          const parsedUser: AuthUser = JSON.parse(storedUserJson);
          setUser(parsedUser);
        }
      } catch (error) {
        // If loading persistence fails, we silently ignore and start unauthenticated.
      } finally {
        setAuthLoading(false);
      }
    };

    void bootstrap();
  }, []);

  const persistUser = useCallback(async (nextUser: AuthUser | null) => {
    if (nextUser) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      setAuthError(null);

      // Basic duplicate check for this in-memory demo
      if (storedCredentials && storedCredentials.email === email) {
        setAuthError('An account with this email already exists.');
        return false;
      }

      const trimmedName = name.trim();
      const trimmedEmail = email.trim().toLowerCase();

      const newUser: AuthUser = {
        id: Date.now().toString(),
        name: trimmedName,
        email: trimmedEmail,
      };

      setStoredCredentials({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });

      setUser(newUser);
      await persistUser(newUser);
      return true;
    },
    [persistUser, storedCredentials],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setAuthError(null);

      if (!storedCredentials) {
        setAuthError('No account found. Please sign up first.');
        return false;
      }

      const trimmedEmail = email.trim().toLowerCase();

      if (
        storedCredentials.email !== trimmedEmail ||
        storedCredentials.password !== password
      ) {
        setAuthError('Incorrect email or password.');
        return false;
      }

      const nextUser: AuthUser = {
        id: Date.now().toString(),
        name: storedCredentials.name,
        email: storedCredentials.email,
      };

      setUser(nextUser);
      await persistUser(nextUser);
      return true;
    },
    [persistUser, storedCredentials],
  );

  const logout = useCallback(async () => {
    setUser(null);
    setAuthError(null);
    await persistUser(null);
  }, [persistUser]);

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      authLoading,
      authError,
      login,
      signup,
      logout,
    }),
    [authError, authLoading, login, logout, signup, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return ctx;
}

