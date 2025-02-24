'use client'

import Link from "next/link";
import NavBar from '@/components/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import PageTitle from '@/components/PageTitle';
import LayoutContainer from '@/components/LayoutConteiner';
import ContentContainer from '@/components/ContentConteiner';
import SidebarImage from '@/components/SideBarImg';
import ButtonLink from '@/components/ButtonLink';
import LoadingSpinner from '@/components/LoadingSpinner';

import { useUser } from '@/hooks/useGetUser';
import useFetchTasks from '@/hooks/useFetchTasks';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';


interface User {
  imagem_perfil?: string;
  nome: string;
}

const Home: React.FC = () => {
  const { user, loading: userLoading } = useUser() as { user: User | null; loading: boolean };
  const { tasks, loading: taskLoading, getListTasks } = useFetchTasks();

  const router = useRouter();

  const isToday = (dateString: string) => {
    const taskDate = new Date(dateString);
    const today = new Date();
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  };

  const handleDeleteTask = async (id: any) => {
    try {
      await axios.delete(`${api}/tasks/${id}`, { withCredentials: true });
      getListTasks();

    } catch (error) {
      console.log("Ocorreu um erro: " + error);
    }
  }


  if (userLoading || taskLoading) {
    return (
      <PrivateRoute>
        <NavBar />
        <LoadingSpinner />
      </PrivateRoute>
    );
  }

  const todayTasks = tasks.filter(task => isToday(task.dataInicio));

  return (
    <PrivateRoute>
      <NavBar />
      <LayoutContainer>
        <ContentContainer>
          <PageTitle title={`Olá ${user?.nome}!`} subtitle={`Você tem ${todayTasks.length} tarefa's para hoje.`} />

          <div className="mt-6 w-full bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto">
            <ul className="max-h-[340px] md:max-h-[420px] overflow-y-auto px-4 py-2 sm:px-6">
              {todayTasks.length > 0 ? (
                todayTasks.map((task) => (
                  <li key={task.id} className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-6 border-b border-gray-200 hover:bg-gray-50 text-center sm:text-left shadow-sm">
                    <div className="flex flex-col items-center sm:items-start">
                      <p className="text-base font-semibold text-red-600">{task.categoria}</p>
                      <p className=" text-sm font-medium">{new Date(task.dataInicio).toLocaleTimeString()}</p>
                    </div>

                    <p className="text-gray-500 2xl:text-lg text-center text-nowrap sm:text-left lg:text-sm">{task.nome}</p>

                    <div className="flex items-center gap-2">
                      <Link href={`/home/editTask/${task.id}`} className="text-sm text-yellow-500 font-semibold">
                        Editar
                      </Link>

                      <span className="text-sm text-red-500 font-semibold cursor-pointer"
                        onClick={() => handleDeleteTask(task.id)}
                      >Deletar</span>

                      <Link href={`/home/task/${task.id}`} className="text-sm text-green-500 font-semibold">
                        Exibir
                      </Link>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center">Você não tem nenhuma tarefa para hoje.</p>
              )}
            </ul>
          </div>

          <div className="mt-8 flex justify-center w-full px-6">
            <ButtonLink href="/tasks" label="Ver lista de tarefas" className="w-1/2 my-5 px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition text-center" />
          </div>

        </ContentContainer>
        <SidebarImage src="/homePage/home.png" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
}

export default Home;
