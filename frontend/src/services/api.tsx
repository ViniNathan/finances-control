import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: "finances-control.vercel.app"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
