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

  logout(): void {
    localStorage.removeItem('token');
  }
};