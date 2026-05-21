import { useState, useEffect, useCallback } from 'react';
import { Task } from '@/types/Task';
import { taskService } from '@/services/task.service'; 
import { ERROR_MESSAGES } from '@/helpers/constants'; 

interface UseFetchTasksResult {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  getListTasks: () => Promise<void>;
}

const useFetchTasks = (): UseFetchTasksResult => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getListTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await taskService.getTasks();

      if (Array.isArray(data)) {
        setTasks(data);
      } else if (data && typeof data === 'object' && Array.isArray((data as any).data)) {
        setTasks((data as any).data);
      } else {
        setTasks([]);
      }
    } catch (err: any) {
      console.error("Erro ao buscar tarefas:", err);

      if (err.code === 'ERR_NETWORK') {
        setError(ERROR_MESSAGES.NETWORK); 
      } else if (err.response?.status === 401) {
        setError(ERROR_MESSAGES.UNAUTHORIZED); 
      } else {
        setError(ERROR_MESSAGES.GENERIC); 
      }

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getListTasks();
  }, [getListTasks]);

  return { tasks, loading, error, getListTasks };
};

export default useFetchTasks;