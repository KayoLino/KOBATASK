'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Componentes
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
import ErrorMessage from '@/components/ui/ErrorMessage';

import { CreateTaskRequest } from '@/types/api';
import { taskService } from '@/services/task.service';
import { handleCategoryChange, handleDateChange, handlePriorityChange } from '@/hooks/useHandleChange';

import { ROUTES, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/helpers/constants'; 

const CreateTask: React.FC = () => {
  const [nameTask, setNameTask] = useState<string>('');
  const [category, setCategory] = useState<string | undefined>('Work'); 
  const [description, setDescription] = useState<string>('');
  const [initDate, setInitDate] = useState<Date | undefined>(undefined);
  const [finishDate, setFinishDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<string | undefined>('Medium'); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameTask || !description || !initDate || !finishDate) {
      setError(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    try {
      setLoading(true);
      setError(''); 

      const taskData: CreateTaskRequest = {
        name: nameTask,
        category: category ?? 'Work',
        description: description,
        status: 'Pending', 
        priority: priority ?? 'Medium',
        start_date: initDate.toISOString(),
        end_date: finishDate.toISOString()
      };

      await taskService.createTask(taskData);

      alert(SUCCESS_MESSAGES.TASK_CREATED);
      router.push(ROUTES.TASKS);

    } catch (err: any) {
      const apiError = err.response?.data?.errors;
      const message = apiError ? Object.values(apiError).flat()[0] : ERROR_MESSAGES.GENERIC;
      
      setError(String(message));
      console.error("Erro na criação:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PrivateRoute>
        <NavBar />
        <LoadingSpinner />
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <NavBar />
      <LayoutContainer>
        <ContentContainer>
          <PageTitle title="Criar nova Tarefa" subtitle="Crie tarefas para ter uma vida mais organizada!" />
          
          <form className="flex justify-center items-center flex-col w-full sm:w-10/12 flex-grow space-y-4" onSubmit={handleCreateTask}>
            
            <InputField 
                label="Nome da tarefa" 
                type="text" 
                className="w-full" 
                value={nameTask} 
                onChange={e => setNameTask(e.target.value)} 
            />

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

            <TextArea 
                label="Descrição" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                className="w-full h-20 sm:h-24" 
            />

            <div className="w-full flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:gap-4">
              <div className="w-full sm:w-1/2">
                <InputField
                  label="Data de início"
                  type="datetime-local"
                  value={initDate ? initDate.toISOString().slice(0, 16) : ""}
                  onChange={(e: any) => handleDateChange(e, setInitDate)}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <InputField
                  label="Data de fim"
                  type="datetime-local"
                  value={finishDate ? finishDate.toISOString().slice(0, 16) : ""}
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
                    loading ? 'bg-red-800 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 cursor-pointer'
                }`}
            >
              {loading ? 'Criando...' : 'Criar nova Tarefa'}
            </Button>
            
            {error && <ErrorMessage message={error} />}
          </form>

        </ContentContainer>
        <SidebarImage src="/createTask/createTaskImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
};

export default CreateTask;