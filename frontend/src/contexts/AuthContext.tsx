import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(data: SignUpData): Promise<void>;
  signOut(): void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@TPMSP:token');
    const user = localStorage.getItem('@TPMSP:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@TPMSP:token', token);
    localStorage.setItem('@TPMSP:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signUp = useCallback(async ({ name, email, password }: SignUpData) => {
    await api.post('/auth/register', {
      name,
      email,
      password,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@TPMSP:token');
    localStorage.removeItem('@TPMSP:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!data.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}; 