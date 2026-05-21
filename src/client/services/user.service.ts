import axiosInstance from "@/lib/axios";
import { ProfileFormData } from '@/types/forms';
import { storage } from '@/utils/storage';
import { AxiosError } from 'axios';

class UserService {
    private readonly BASE_PATH = '/api/user';

    async updateProfile(data: ProfileFormData): Promise<void> {
        try {
            const formData = new FormData();
            
            formData.append("name", data.name);
            formData.append("email", data.email);
            
            if (data.currentPassword) {
                formData.append("currentPassword", data.currentPassword);
            }
            
            if (data.newPassword) {
                formData.append("newPassword", data.newPassword);
            }
            
            if (data.profileImage) {
                formData.append("profileImage", data.profileImage);
            }

            await axiosInstance.put(`${this.BASE_PATH}/update`, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data" 
                }
            });

            const updatedProfile = await this.getProfile();
            storage.setUser(updatedProfile.user);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data) {
                const backendErrors = error.response.data;
                
                if (error.response.status === 422 && backendErrors.errors) {
                    const firstError = Object.values(backendErrors.errors)[0];
                    throw new Error(Array.isArray(firstError) ? firstError[0] : firstError);
                }
                
                if (backendErrors.message) {
                    throw new Error(backendErrors.message);
                }
            }
            
            throw new Error('Erro ao atualizar perfil');
        }
    }

    async getProfile() {
        const response = await axiosInstance.get(`${this.BASE_PATH}/profile`);
        return response.data;
    }
}

export const userService = new UserService();