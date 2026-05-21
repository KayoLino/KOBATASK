import { useEffect, useState, useCallback } from 'react';
import { taskService } from '@/services/task.service';
import { Task } from '@/types/Task';

export const useGetTask = (id: string | string[]) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCurrentTask = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const data = await taskService.getTask(id);
      setTask(data);
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
