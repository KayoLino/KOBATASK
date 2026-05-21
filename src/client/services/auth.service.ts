import axiosInstance from "@/lib/axios";
import { LoginRequest, RegisterRequest, AuthResponse, RefreshTokenResponse } from "@/types/api";
import { storage } from '@/utils/storage';

class AuthService {
    private readonly BASE_PATH = '/api/auth';

    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await axiosInstance.post<AuthResponse>(
            `${this.BASE_PATH}/login`,
            data
        );

        const authData = response.data;

        if (authData.access_token) {
            storage.setToken(authData.access_token);
        }

        if (authData.refresh_token) {
            storage.setRefreshToken(authData.refresh_token);
        }

        if (authData.user) {
            storage.setUser(authData.user);
        }

        return authData;
    }

    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await axiosInstance.post<AuthResponse>(
            `${this.BASE_PATH}/register`,
            data
        );

        const authData = response.data;

        if (authData.access_token) {
            storage.setToken(authData.access_token);
        }

        if (authData.refresh_token) {
            storage.setRefreshToken(authData.refresh_token);
        }

        if (authData.user) {
            storage.setUser(authData.user);
        }

        return authData;
    }

    async refreshToken(): Promise<RefreshTokenResponse> {
        const refreshToken = storage.getRefreshToken();

        if (!refreshToken) {
            throw new Error('Refresh token não encontrado');
        }

        const response = await axiosInstance.post<RefreshTokenResponse>(
            `${this.BASE_PATH}/refresh`,
            { refresh_token: refreshToken }
        );

        const data = response.data;

        storage.setToken(data.access_token);
        storage.setRefreshToken(data.refresh_token);

        return data;
    }

    async logout(): Promise<void> {
        try {
            await axiosInstance.post(`${this.BASE_PATH}/logout`);
        }catch(error) {
            console.error('Erro ao chamar API de logout:', error);
        } finally {
            storage.clearAuth();
        }
    }

    async getCurrentUser(): Promise<AuthResponse['user']> {
        const response = await axiosInstance.get<AuthResponse['user']>(
            `${this.BASE_PATH}/me`
        );
        return response.data;
    }

    isAuthenticated(): boolean {
        return !!storage.getToken();
    }

    getToken(): string | null {
        return storage.getToken();
    }

    getRefreshToken(): string | null {
        return storage.getRefreshToken();
    }

    getCurrentUserFromStorage() {
        return storage.getUser();
    }
}

export const authService = new AuthService();