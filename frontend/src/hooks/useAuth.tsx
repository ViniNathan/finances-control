import { useState, useCallback } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.login({ email, password });
      setUser(data);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error while logging in');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.register({ name, email, password });
      setUser(data);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
}