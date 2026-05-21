import { AxiosError } from 'axios';
import { ApiError } from '@/types/api';

export const handleApiError = (error: unknown): string => {
    if (error instanceof AxiosError) {
        const apiError = error.response?.data as ApiError;

        if (apiError?.errors && typeof apiError.errors === 'object' && !Array.isArray(apiError.errors)) {
            const firstErrorKey = Object.keys(apiError.errors)[0];
            const firstErrorArray = apiError.errors[firstErrorKey] as string[] | undefined;
            
            if (Array.isArray(firstErrorArray) && firstErrorArray.length > 0) {
                return firstErrorArray[0];
            }
        }

        if (apiError?.errors && Array.isArray(apiError.errors) && apiError.errors.length > 0) {
            return apiError.errors[0];
        }

        if (apiError?.message) {
            return apiError.message;
        }

        switch (error.response?.status) {
            case 400:
                return 'Requisição inválida. Verifique os dados enviados.';
            case 401:
                return 'Não autorizado. Faça login novamente.';
            case 403:
                return 'Acesso negado';
            case 404:
                return 'Recurso não encontrado.';
            case 422:
                return 'Dados de validação inválidos.';
            case 500:
                return 'Erro interno do servidor.';
            default:
                return 'Erro ao conectar com o servidor.';
        }
    }

    return 'Algo deu errado. Tente novamente mais tarde.';
};

export const logError = (error: unknown, context?: string) => {
    if (process.env.NODE_ENV === 'development') {
        console.error(`[Error${context ? ` - ${context}` : ''}]:`, error);
    }
};