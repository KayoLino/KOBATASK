import axiosInstance from "@/lib/axios";
import { CreateTaskRequest, UpdateTaskRequest } from "@/types/api";
import { Task } from "@/types/Task";

class TaskService {
    private readonly BASE_PATH = '/api/task';

    async createTask(data: CreateTaskRequest): Promise<Task> {
        const response = await axiosInstance.post<Task>(this.BASE_PATH, data);
        return response.data;
    }

    async getTasks(): Promise<Task[]> { 
        const response = await axiosInstance.get(this.BASE_PATH);
        return response.data; 
    }

    async getTask(id: string | string[]): Promise<Task>{
        const response = await axiosInstance.get(`${this.BASE_PATH}/${id}`);
        return response.data;
    }

    async markAscompleteTask(id: number | string | string[]): Promise<{ message: string}>{
        const response = await axiosInstance.patch(`${this.BASE_PATH}/${id}/complete`);
        return response.data;
    }

    async markAsIncomplete(id: number | string | string[]): Promise<{ message: string }> {
        const response = await axiosInstance.patch(`${this.BASE_PATH}/${id}/incomplete`);
        return response.data;
    }

    async updateTask(id: number | string | string[], data: UpdateTaskRequest): Promise<Task> {
        const response = await axiosInstance.put(`${this.BASE_PATH}/${id}`, data);
        return response.data;
    }

    async deleteTask(id: number | string | string[]): Promise <void>{
        await axiosInstance.delete(`${this.BASE_PATH}/${id}`);
    }
}

export const taskService = new TaskService();
