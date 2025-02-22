'use client';

import { useParams } from 'next/navigation';
import axios from 'axios';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

import NavBar from '@/components/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import PageTitle from '@/components/PageTitle';
import LayoutContainer from '@/components/LayoutConteiner';
import ContentContainer from '@/components/ContentConteiner';
import SidebarImage from '@/components/SideBarImg';
import ArrowBack from '@/components/ArrowBack';
import ButtonLink from '@/components/ButtonLink';
import TaskDate from '@/components/TaskDate';
import TaskInfo from '@/components/TaskInfo';
import TaskName from '@/components/TaskName';
import Button from '@/components/Button';
import { useGetTask } from '@/hooks/useGetTask';
import { useEffect } from 'react';

const TaskDetails = () => {

  const { id } = useParams();

  const router = useRouter();

  const { task, loading, refetchTask } = useGetTask(id);

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${api}/tasks/${id}`, { withCredentials: true });
      alert("Tarefa deletada com sucesso.");
      router.push('/tasks');

    } catch (error) {
      console.log("Ocorreu um erro: " + error);
    }
  }


  const handleCompleteTask = async () => {
    try {
      await axios.put(`${api}/tasks/${id}/complete`, {}, { withCredentials: true });
      refetchTask(); // Atualiza os dados da tarefa
    } catch (error) {
      console.log("Ocorreu um erro: " + error);
    }
  };

  const handleIncompleteTask = async () => {
    try {
      await axios.put(`${api}/tasks/${id}/incomplete`, {}, { withCredentials: true });
      refetchTask(); // Atualiza os dados da tarefa
    } catch (error) {
      console.log("Ocorreu um erro: " + error);
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
          <ArrowBack href='/tasks' />


          <PageTitle title="Detalhes da Tarefa" subtitle="Esses são os detalhes desta tarefa" />
          <div className="flex mt-10  flex-col sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-10/12 flex-grow space-y-8">

            <div className="flex justify-center items-center">
              {task?.status === "Concluída" ?
                <Button onClick={handleIncompleteTask} className="w-1/2  px-4 font-semibold py-3 bg-green-500 hover:bg-green-600 text-white rounded-3xl transition cursor-pointer" >Tarefa concluída</Button>
                :
                <Button onClick={handleCompleteTask} className="w-1/2  px-4 font-semibold py-3 border border-green-500 text-green-500 rounded-3xl cursor-pointer hover:bg-green-600 hover:text-white transition">Concluir tarefa</Button>
              }
            </div>


            <TaskName name="Nome da Tarefa" value={task?.nome} />
            <TaskName name="Status" value={task?.status} />

            <div className="flex flex-wrap justify-between  lg:flex-row">
              <TaskInfo label="Categoria" value={task?.categoria} />
              <TaskInfo label="Prioridade" value={task?.prioridade} />
            </div>

            <div className="w-full overflow-x-hidden">
              <p className="text-red-500 text-lg font-semibold mb-3">Descrição:</p>
              <p className="px-4 bg-slate-100 rounded-lg pt-4 h-24 w-full break-words whitespace-pre-wrap overflow-hidden text-wrap font-medium">
                {task?.descricao}
              </p>
            </div>

            <div className="flex justify-center space-x-4  lg:flex-row">
              <TaskDate label="Data de Início" date={task?.dataInicio} />
              <TaskDate label="Data de Fim" date={task?.dataFim} />
            </div>

            <div className="flex justify-center items-center flex-col">
              <ButtonLink href={`/task/editTask/${id}`} label="Editar tarefa" className="w-1/2 my-5 px-4 font-semibold py-3 bg-yellow-500 text-white rounded-3xl hover:bg-yellow-600 transition text-center" />
              {loading ?
                <Button onClick={handleDeleteTask} disabled className="w-1/2 my-4 px-4 font-semibold py-3 bg-red-400 text-white rounded-3xl cursor-not-allowed transition">Excluir tarefa</Button>
                :
                <Button onClick={handleDeleteTask} className="w-1/2  px-4 font-semibold py-3 bg-red-400 text-white rounded-3xl cursor-pointer hover:bg-red-600 transition">Excluir tarefa</Button>
              }
            </div>
          </div>
        </ContentContainer>
        <SidebarImage src="/detailsTask/taskImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
}

export default TaskDetails;
