import axios from 'axios';
import { storage } from '@/utils/storage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
    
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor de request - adiciona token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response - refresh automático
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se for erro 401 e não for a rota de refresh
    if (
       error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/refresh') &&
      !originalRequest.url?.includes('/login') &&  
      !originalRequest.url?.includes('/register')
    ) {

      if (isRefreshing) {
        
        // Aguarda o refresh em andamento
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = storage.getRefreshToken();

      if (!refreshToken) {
        storage.clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }

      try {
      // Tenta fazer refresh (usa axios puro para não entrar no loop)
      const response = await axios.post(`${API_URL}/api/auth/refresh`, {
        refresh_token: refreshToken,
      });

      const {access_token, refresh_token: newRefreshToken} = response.data;

      // Salva novos tokens
      storage.setToken(access_token);
      storage.setRefreshToken(newRefreshToken);

      // Atualiza o header da requisição original
      originalRequest.headers.Authorization = `Bearer ${access_token}`;

      processQueue(null, access_token);

      // Retenta a requisição original
      return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(ReferenceError, null);
        storage.clearAuth();

        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 500) {
      console.error('Erro no servidor:', error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;