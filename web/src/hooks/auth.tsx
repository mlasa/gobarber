import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}
interface SignInData {
  email: string;
  password: string;
}
interface AuthContextData {
  user: object;
  signIn(credentials: SignInData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');
    if (token && user) return { token, user: JSON.parse(user) };

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });

    const { authenticationToken, user } = response.data;
    localStorage.setItem('@GoBarber:token', authenticationToken);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token: authenticationToken, user });
  }, []);

  const signOut = useCallback(() => {
    if (
      localStorage.getItem('@GoBarber:token') &&
      localStorage.getItem('@GoBarber:user')
    ) {
      localStorage.removeItem('@GoBarber:token');
      localStorage.removeItem('@GoBarber:user');
      setData({} as AuthState);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within a AuthProvider');

  return context;
};

export { AuthProvider, useAuth };
