import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { api } from '@/lib/api';
import { Task } from '@/types/Task';

export const useGetTask = (id: string | string[] | undefined) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCurrentTask = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const res = await axios.get(`${api}/tasks/${id}`, { withCredentials: true });
      setTask(res.data.task);
    } catch (error) {
      console.error("Erro ao buscar a tarefa", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCurrentTask();
  }, [getCurrentTask]);

  return { task, loading, refetchTask: getCurrentTask };
};
