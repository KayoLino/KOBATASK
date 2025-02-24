import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { api } from '@/lib/api';

import { Task } from '@/types/Task';

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
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${api}/tasks/`, { withCredentials: true });
      console.log(response.data);

      if (Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
      } else {
        console.error("A chave 'tasks' não é um array:", response.data.tasks);
        setError("Erro ao carregar tarefas.");
      }
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      setError("Erro ao carregar tarefas. Tente novamente mais tarde.");
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
