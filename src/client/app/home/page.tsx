'use client'

import Link from "next/link";
import NavBar from '@/components/layout/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import PageTitle from '@/components/layout/PageTitle';
import LayoutContainer from '@/components/layout/LayoutContainer';
import ContentContainer from '@/components/layout/ContentContainer';
import { SidebarImage } from '@/components/layout';
import ButtonLink from '@/components/common/ButtonLink';
import { LoadingSpinner } from '@/components/ui'; 

import { useUser } from '@/hooks/useGetUser';
import useFetchTasks from '@/hooks/useFetchTasks';
import { ROUTES, translateTaskKey } from "@/helpers/constants"; 

const Home: React.FC = () => {
  const { user, loading: userLoading } = useUser();
  const { tasks, loading: taskLoading } = useFetchTasks();

  const isToday = (dateString?: string) => {
    if (!dateString) return false;
    const taskDate = new Date(dateString);
    const today = new Date();
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  };

  if (userLoading || taskLoading) {
    return (
      <PrivateRoute>
        <NavBar />
        <LoadingSpinner />
      </PrivateRoute>
    );
  }

  const todayTasks = tasks.filter(task => isToday(task.start_date) && task.status !== 'Completed');

  return (
    <PrivateRoute>
      <NavBar />
      <LayoutContainer>
        <ContentContainer>
          <PageTitle title={`Olá ${user?.name || ''}!`} subtitle={`Você tem ${todayTasks.length} tarefa(s) para hoje.`} />

          <div className="mt-6 w-full bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto">
            <ul className="max-h-[340px] md:max-h-[420px] overflow-y-auto px-4 py-2 sm:px-6">
              {todayTasks.length > 0 ? (
                todayTasks.map((task) => (
                  <li key={task.id} className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-6 border-b border-gray-200 hover:bg-gray-50 text-center sm:text-left shadow-sm">
                    <div className="flex flex-col items-center sm:items-start">
                      <p className="text-base font-semibold text-red-600">{translateTaskKey(task.category)}</p>
                      <p className="text-sm font-medium">
                        {task.start_date ? new Date(task.start_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '---'}
                      </p>
                    </div>

                    <p className="text-gray-500 2xl:text-lg text-center text-nowrap sm:text-left lg:text-sm">{task.name}</p>

                    <div className="flex items-center gap-3">
                      <Link href={`${ROUTES.TASKS}/${task.id}`} className="text-sm text-green-500 font-semibold hover:underline">
                        Exibir
                      </Link>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center py-10 text-gray-400">Você não tem nenhuma tarefa pendente para hoje.</p>
              )}
            </ul>
          </div>

          <div className="mt-8 flex justify-center w-full px-6">
            <ButtonLink href={ROUTES.TASKS} label="Ver lista de tarefas" className="w-1/2 my-5 px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition text-center" />
          </div>

        </ContentContainer>
        <SidebarImage src="/homePage/home.png" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
}

export default Home;