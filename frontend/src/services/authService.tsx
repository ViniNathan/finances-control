import api from './api';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth.tsx';

export const authService = {
  async register(userData: RegisterCredentials): Promise<User> {
    const response = await api.post<User>('/api/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<User> {
    const response = await api.post<User>('/api/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async validateToken(): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }
      const response = await api.get<{valid: boolean}>('/api/auth/validate');
      return response.status === 200 && response.data.valid;
    } catch (error) {
      return false;
    }
  },

  logout(): void {
    localStorage.removeItem('token');
  }
};