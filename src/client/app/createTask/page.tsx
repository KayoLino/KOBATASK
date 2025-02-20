'use client';

import { useState, ChangeEvent } from 'react';
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



const CreateTask: React.FC = () => {
  const [nameTask, setNameTask] = useState<string>('');
  const [category, setCategory] = useState<string>('Trabalho');
  const [description, setDescription] = useState<string>('');
  const [initDate, setInitDate] = useState<Date | undefined>(undefined);
  const [finishDate, setFinishDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<string>('Média');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<Date | undefined>>) => {
    const value = e.target.value;

    if (!value) {
      setter(undefined);
      return;
    }

    const date = new Date(value);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    setter(date);
  };



  const handleCreateTask = async (e: any) => {

    e.preventDefault();

    try {
      setLoading(true);

      if (!nameTask || !category || !description || !initDate || !finishDate || !priority) {
        setError('Preencha todos os campos!');
        return;
      }

      const status = "Pendente";

      await axios.post(`${api}/tasks/create`, { nameTask, category, description, status, initDate, finishDate, priority }, {
        withCredentials: true,
      })

      setNameTask('');
      setDescription('');
      setInitDate(undefined);
      setFinishDate(undefined);

      alert("Tarefa Criada");
      await router.push('/listTasks');

    } catch (error) {
      const errorMessage = error.response?.data?.errors?.[0] || 'Algo deu errado. Tente novamente mais tarde.';
      setError(errorMessage);
      console.log(error.response?.data?.errors?.[0]);
    } finally {
      setLoading(false);
    }
  }

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
          <form className="flex justify-center items-center flex-col w-full sm:w-10/12 flex-grow space-y-4">
            <InputField label="Nome da tarefa" type="text" className="w-full" value={nameTask} onChange={e => setNameTask(e.target.value)} />

            <Select
              label="Categoria:"
              value={category}
              onChange={handleCategoryChange}
              options={[
                { value: 'Trabalho', label: 'Trabalho' },
                { value: 'Projeto', label: 'Projeto' },
                { value: 'Pessoal', label: 'Pessoal' },
              ]}
            />

            <TextArea label="Descrição" value={description} onChange={e => setDescription(e.target.value)} className="w-full h-20 sm:h-24" />

            <div className="w-full flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:gap-4">
              <div className="w-full sm:w-1/2">
                <InputField
                  label="Data de início"
                  type="datetime-local"
                  value={initDate ? initDate.toISOString().slice(0, 16) : ""}
                  onChange={(e) => handleDateChange(e, setInitDate)}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <InputField
                  label="Data de fim"
                  type="datetime-local"
                  value={finishDate ? finishDate.toISOString().slice(0, 16) : ""}
                  onChange={(e) => handleDateChange(e, setFinishDate)}
                  className="w-full"
                />
              </div>
            </div>
            <Select
              label="Prioridade:"
              value={priority}
              onChange={handlePriorityChange}
              options={[
                { value: 'Baixa', label: 'Baixa' },
                { value: 'Média', label: 'Média' },
                { value: 'Alta', label: 'Alta' },
              ]}
            />

            {loading ?
              <Button onClick={e => handleCreateTask(e)} disabled className="w-1/2 my-4 px-4 font-semibold py-3 bg-red-800 text-white rounded-3xl cursor-not-allowed transition">Criar nova Tarefa</Button>
              :
              <Button onClick={e => handleCreateTask(e)} className="w-1/2 my-4 px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl cursor-pointer hover:bg-red-600 transition">Criar nova Tarefa</Button>
            }
            {error && <ErrorMessage message={error} />}
          </form>
        </ContentContainer>
        <SidebarImage src="/createTask/createTaskImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
};

export default CreateTask;
