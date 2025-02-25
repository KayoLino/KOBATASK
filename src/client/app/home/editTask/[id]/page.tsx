'use client';

import { useParams } from 'next/navigation';
import { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { api } from "@/lib/api";
import { useRouter } from 'next/navigation';

import PrivateRoute from '@/components/PrivateRoute';
import NavBar from '@/components/Navbar';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import LayoutContainer from '@/components/LayoutConteiner';
import ContentContainer from '@/components/ContentConteiner';
import SidebarImage from '@/components/SideBarImg';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import ArrowBack from '@/components/ArrowBack';

import { handleCategoryChange, handleDateChange, handlePriorityChange, handleStatusChange } from '@/hooks/useHandleChange';
import { useGetTask } from '@/hooks/useGetTask';

const EditTask = () => {

  const { id } = useParams();

  const { task, loading: loadingTask } = useGetTask(id);

  const router = useRouter();

  const [nameTask, setNameTask] = useState<string>('');
  const [category, setCategory] = useState<string>('Trabalho');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [initDate, setInitDate] = useState<Date | undefined>(undefined);
  const [finishDate, setFinishDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<string>('Média');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (task) {
      setNameTask(task.nome || '');
      setCategory(task.categoria || 'Trabalho');
      setDescription(task.descricao || '');
      setStatus(task.status || '');
      setInitDate(task.dataInicio ? new Date(task.dataInicio) : undefined);
      setFinishDate(task.dataFim ? new Date(task.dataFim) : undefined);
      setPriority(task.prioridade || 'Média');
    }
  }, [task]);

  const handleEditTask = async (e: any) => {

    e.preventDefault();
    setLoading(true)

    try {

      await axios.put(`${api}/tasks/${id}`, { nameTask, category, description, status, initDate, finishDate, priority }, {
        withCredentials: true,
      })

      setNameTask('');
      setDescription('');
      setInitDate(undefined);
      setFinishDate(undefined);

      alert("Tarefa atualizada");
      router.push('/home');

    } catch (error) {
      const errorMessage = error.response?.data?.errors?.[0] || 'Algo deu errado. Tente novamente mais tarde.';
      setError(errorMessage);
      console.log(error.response?.data?.errors?.[0]);
    }
  }



  if (loadingTask) {
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
          <ArrowBack href='/home' />
          <PageTitle title="Edição de tarefa" subtitle="Modo edição de tarefa" />

          <form className="flex justify-center items-center flex-col w-full sm:w-10/12 flex-grow space-y-4">
            <InputField label="Nome da tarefa" type="text" className="w-full" value={nameTask} onChange={e => setNameTask(e.target.value)} />

            <Select
              label="Categoria:"
              value={category}
              onChange={(e: any) => handleCategoryChange(e, setCategory)}
              options={[
                { value: 'Trabalho', label: 'Trabalho' },
                { value: 'Projeto', label: 'Projeto' },
                { value: 'Pessoal', label: 'Pessoal' },
              ]}
            />

            <TextArea label="Descrição" value={description} onChange={e => setDescription(e.target.value)} className="w-full h-20 sm:h-24" />

            <Select
              label="Status:"
              value={status}
              onChange={(e: any) => handleStatusChange(e, setStatus)}
              options={[
                { value: 'Pendente', label: 'Pendente' },
                { value: 'Em andamento', label: 'Em andamento' },
                { value: 'Atrasado', label: 'Atrasado' },
              ]}
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
              value={priority}
              onChange={(e: any) => handlePriorityChange(e, setPriority)}
              options={[
                { value: 'Baixa', label: 'Baixa' },
                { value: 'Média', label: 'Média' },
                { value: 'Alta', label: 'Alta' },
              ]}
            />

            {loading ?
              <Button onClick={e => handleEditTask(e)} disabled className="w-1/2 my-4 px-4 font-semibold py-3 bg-yellow-600 text-white rounded-3xl cursor-not-allowed transition">Editar tarefa</Button>
              :
              <Button onClick={e => handleEditTask(e)} className="w-1/2 my-4 px-4 font-semibold py-3 bg-yellow-500 text-white rounded-3xl cursor-pointer hover:bg-yellow-600 transition">Editar tarefa</Button>
            }
            {error && <ErrorMessage message={error} />}

          </form>

        </ContentContainer>
        <SidebarImage src="/detailsTask/taskImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
}

export default EditTask;