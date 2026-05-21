export interface ApiResponse<T = any> {
    data: T;
    message?: string;
}

export interface ApiError {
    errors?: string[];
    message?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface AuthResponse {
    user: {
        id: number;
        name: string;
        email: string;
        profile_image?: string;
    }
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

export interface RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

export interface CreateTaskRequest {
  name: string;
  category: string;
  description: string;
  status: string;
  priority: string;
  start_date: string;
  end_date: string;
}

export type UpdateTaskRequest = Partial<CreateTaskRequest>;