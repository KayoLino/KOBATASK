'use client';

import { useParams, useRouter } from 'next/navigation';
import { taskService } from '@/services/task.service';
import { useGetTask } from '@/hooks/useGetTask';
import { ROUTES, SUCCESS_MESSAGES, translateTaskKey} from '@/helpers/constants';
import { toast, Toaster } from 'react-hot-toast';

import NavBar from '@/components/layout/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import { LoadingSpinner } from '@/components/ui';
import PageTitle from '@/components/layout/PageTitle';
import LayoutContainer from '@/components/layout/LayoutContainer';
import ContentContainer from '@/components/layout/ContentContainer';
import { SidebarImage } from '@/components/layout';
import ArrowBack from '@/components/layout/ArrowBack';
import ButtonLink from '@/components/common/ButtonLink';
import TaskDate from '@/components/tasks/TaskDate';
import TaskInfo from '@/components/tasks/TaskInfo';
import TaskName from '@/components/tasks/TaskName';
import Button from '@/components/common/Button';

const TaskDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const { task, loading, refetchTask } = useGetTask(id);

  const handleDeleteTask = async () => {
    const confirmDelete = window.confirm("Tem certeza que quer apagar?");
    if (!confirmDelete) return;

    try {
      await taskService.deleteTask(id);
      toast.success(SUCCESS_MESSAGES.TASK_DELETED || 'Tarefa excluída com sucesso!');
      
      setTimeout(() => {
        router.push(ROUTES.TASKS);
      }, 800);
    } catch (error) {
      toast.error('Erro ao deletar a tarefa.');
      console.error("Erro ao deletar:", error);
    }
  };

  const handleCompleteTask = async () => {
    try {
      await taskService.markAscompleteTask(id);
      toast.success('Tarefa concluída!');
      refetchTask();
    } catch (error) {
      toast.error('Erro ao concluir a tarefa.');
      console.error("Erro ao completar:", error);
    }
  };

  const handleIncompleteTask = async () => {
    try {
      await taskService.markAsIncomplete(id);
      toast.success('Tarefa reaberta!');
      refetchTask();
    } catch (error) {
      toast.error('Erro ao reabrir a tarefa.');
      console.error("Erro ao desmarcar:", error);
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
      <Toaster position="top-right" />
      <NavBar />
      <LayoutContainer>
        <ContentContainer>
          <ArrowBack href={ROUTES.TASKS} />

          <PageTitle title="Detalhes da Tarefa" subtitle="Esses são os detalhes desta tarefa" />
          
          <div className="flex mt-10 flex-col sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-10/12 flex-grow space-y-8">
            <div className="flex justify-center items-center">
              {task?.status === "Completed" ? (
                <Button onClick={handleIncompleteTask} className="w-1/2 px-4 font-semibold py-3 bg-green-500 hover:bg-green-600 text-white rounded-3xl transition cursor-pointer">
                  Tarefa concluída
                </Button>
              ) : (
                <Button onClick={handleCompleteTask} className="w-1/2 px-4 font-semibold py-3 border border-green-500 text-green-500 rounded-3xl cursor-pointer hover:bg-green-600 hover:text-white transition">
                  Concluir tarefa
                </Button>
              )}
            </div>

            <TaskName name="Nome da Tarefa" value={task?.name} />
            <TaskName name="Status" value={translateTaskKey(task?.status)} />

            <div className="flex flex-wrap justify-between lg:flex-row">
              <TaskInfo label="Categoria" value={translateTaskKey(task?.category)} />
              <TaskInfo label="Prioridade" value={translateTaskKey(task?.priority)} />
            </div>

            <div className="w-full overflow-x-hidden">
              <p className="text-red-500 text-lg font-semibold mb-3">Descrição:</p>
              <p className="px-4 bg-slate-100 rounded-lg pt-4 h-24 w-full break-words whitespace-pre-wrap overflow-hidden text-wrap font-medium">
                {task?.description}
              </p>
            </div>

            <div className="flex justify-center space-x-4 lg:flex-row">
              <TaskDate label="Data de Início" date={task?.start_date} />
              <TaskDate label="Data de Fim" date={task?.end_date} />
            </div>

            <div className="flex justify-center items-center flex-col">
              <ButtonLink 
                href={`${ROUTES.TASKS}/editTask/${id}`} 
                label="Editar tarefa" 
                className="w-1/2 my-5 px-4 font-semibold py-3 bg-yellow-500 text-white rounded-3xl hover:bg-yellow-600 transition text-center" 
              />
              
              <Button 
                onClick={handleDeleteTask} 
                className="w-1/2 px-4 font-semibold py-3 bg-red-400 text-white rounded-3xl cursor-pointer hover:bg-red-600 transition"
              >
                Excluir tarefa
              </Button>
            </div>
          </div>
        </ContentContainer>
        <SidebarImage src="/detailsTask/taskImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
};

export default TaskDetails;