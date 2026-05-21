'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { taskService } from '@/services/task.service';
import { useGetTask } from '@/hooks/useGetTask';
import { handleCategoryChange, handleDateChange, handlePriorityChange, handleStatusChange } from '@/hooks/useHandleChange';
import { ROUTES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/helpers/constants';

// Layout e UI
import PrivateRoute from '@/components/PrivateRoute';
import NavBar from '@/components/layout/Navbar';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import PageTitle from '@/components/layout/PageTitle';
import Select from '@/components/common/Select';
import TextArea from '@/components/common/TextArea';
import LayoutContainer from '@/components/layout/LayoutContainer';
import ContentContainer from '@/components/layout/ContentContainer';
import { SidebarImage } from '@/components/layout';
import { LoadingSpinner } from '@/components/ui';
import ArrowBack from '@/components/layout/ArrowBack';
import ErrorMessage from '@/components/ui/ErrorMessage';

const EditTask = () => {
  const { id } = useParams();
  const router = useRouter();
  const { task, loading: loadingTask } = useGetTask(id as string);

  const [nameTask, setNameTask] = useState<string>('');
  const [category, setCategory] = useState<string | undefined>('Work');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string | undefined>('Pending');
  const [initDate, setInitDate] = useState<Date | undefined>(undefined);
  const [finishDate, setFinishDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<string | undefined>('Medium');
  
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const formatForInput = (date?: Date) => {
    if (!date || isNaN(date.getTime())) return "";
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (task) {
      setNameTask(task.name || '');
      setCategory(task.category || 'Work');
      setDescription(task.description || '');
      setStatus(task.status || 'Pending');
      setInitDate(task.start_date ? new Date(task.start_date) : undefined);
      setFinishDate(task.end_date ? new Date(task.end_date) : undefined);
      setPriority(task.priority || 'Medium');
    }
  }, [task]);

  const handleEditTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name: nameTask,
      category: category ?? 'Work',
      description: description,
      status: status ?? 'Pending',
      priority: priority ?? 'Medium',
      start_date: initDate ? initDate.toISOString() : '',
      end_date: finishDate ? finishDate.toISOString() : ''
    };

    try {
      await taskService.updateTask(Number(id), payload);
      alert(SUCCESS_MESSAGES.TASK_UPDATED);
      router.push(`${ROUTES.TASKS}/${id}`);
    } catch (err: any) {
      const apiError = err.response?.data?.errors;
      const message = apiError ? Object.values(apiError).flat()[0] : ERROR_MESSAGES.GENERIC;
      setError(String(message));
      console.error("Erro na edição:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingTask) return <PrivateRoute><NavBar /><LoadingSpinner /></PrivateRoute>;

  return (
    <PrivateRoute>
      <NavBar />
      <LayoutContainer>
        <ContentContainer>
          <ArrowBack href={`${ROUTES.TASKS}/${id}`} />
          <PageTitle title="Edição de tarefa" subtitle="Modo edição de tarefa" />

          <form className="flex justify-center items-center flex-col w-full sm:w-10/12 flex-grow space-y-4" onSubmit={handleEditTask}>
            <InputField label="Nome da tarefa" value={nameTask} onChange={e => setNameTask(e.target.value)} />

            <Select
              label="Categoria:"
              value={category || 'Work'}
              onChange={(e: any) => handleCategoryChange(e, setCategory)}
              options={[
                { value: 'Work', label: 'Trabalho' },
                { value: 'Project', label: 'Projeto' },
                { value: 'Personal', label: 'Pessoal' },
              ]}
            />

            <TextArea label="Descrição" value={description} onChange={e => setDescription(e.target.value)} />

            <Select
              label="Status:"
              value={status || 'Pending'}
              onChange={(e: any) => handleStatusChange(e, setStatus)}
              options={[
                { value: 'Pending', label: 'Pendente' },
                { value: 'Inprogress', label: 'Em andamento' },
                { value: 'Overdue', label: 'Atrasado' },
                { value: 'Completed', label: 'Concluído' },
              ]}
            />

            <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="w-full sm:w-1/2">
                <InputField
                  label="Data de início"
                  type="datetime-local"
                  value={formatForInput(initDate)}
                  onChange={(e: any) => handleDateChange(e, setInitDate)}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <InputField
                  label="Data de fim"
                  type="datetime-local"
                  value={formatForInput(finishDate)}
                  onChange={(e: any) => handleDateChange(e, setFinishDate)}
                  className="w-full"
                />
              </div>
            </div>

            <Select
              label="Prioridade:"
              value={priority || 'Medium'}
              onChange={(e: any) => handlePriorityChange(e, setPriority)}
              options={[
                { value: 'Low', label: 'Baixa' },
                { value: 'Medium', label: 'Média' },
                { value: 'High', label: 'Alta' },
              ]}
            />

            <Button 
              type="submit"
              disabled={loading} 
              className={`w-1/2 my-4 px-4 font-semibold py-3 text-white rounded-3xl transition ${
                loading ? 'bg-yellow-700 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 cursor-pointer'
              }`}
            >
              {loading ? 'Salvando...' : 'Editar tarefa'}
            </Button>

            {error && <ErrorMessage message={error} />}
          </form>
        </ContentContainer>
        <SidebarImage src="/detailsTask/taskImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
}

export default EditTask;