'use client'

import Link from "next/link";
import { useState } from 'react';

// Componentes de Layout
import NavBar from '@/components/layout/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import PageTitle from '@/components/layout/PageTitle';
import LayoutContainer from '@/components/layout/LayoutContainer';
import ContentContainer from '@/components/layout/ContentContainer';
import { SidebarImage } from '@/components/layout';
import ButtonLink from '@/components/common/ButtonLink';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SelectFilter from '@/components/tasks/SelectFilter';

// Ícones e Constantes
import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { ROUTES, translateTaskKey } from "@/helpers/constants"; 

// Hooks
import useFetchTasks from '@/hooks/useFetchTasks';

const ListTasks = () => {
  const { tasks, loading, error } = useFetchTasks();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState({
    category: "", 
    status: "",
    priority: "",
  });
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  const handleChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value
    }));
  };

  const filteredTasks = tasks.filter(task => {
    const taskName = task.name.toLowerCase();
    const taskCategoryPT = translateTaskKey(task.category);
    const taskStatusPT = translateTaskKey(task.status);
    const taskPriorityPT = translateTaskKey(task.priority);
    const searchLower = searchTerm.toLowerCase();

    const matchesSearchTerm = 
      taskName.includes(searchLower) || 
      taskCategoryPT.toLowerCase().includes(searchLower) ||
      taskStatusPT.toLowerCase().includes(searchLower);

    const matchesCategory = filters.category ? taskCategoryPT === filters.category : true;
    const matchesStatus = filters.status ? taskStatusPT === filters.status : true;
    const matchesPriority = filters.priority ? taskPriorityPT === filters.priority : true;

    return matchesSearchTerm && matchesCategory && matchesStatus && matchesPriority;
  });

  if (loading) return <PrivateRoute><NavBar /><LoadingSpinner /></PrivateRoute>;

  if (error) {
    return (
      <PrivateRoute>
        <NavBar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </PrivateRoute>
    );
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-transparent border border-blue-500 text-blue-500';
      case 'Inprogress': return 'bg-transparent border border-yellow-500 text-yellow-500';
      case 'Overdue': return 'bg-transparent border border-red-500 text-red-500';
      case 'Completed': return 'bg-transparent border border-green-500 text-green-500';
      default: return 'border border-gray-300 text-gray-400';
    }
  };

  return (
    <PrivateRoute>
      <NavBar />
      <LayoutContainer>
        <ContentContainer>
          <PageTitle title="Lista de Tarefas" subtitle="Veja todas as suas tarefas" />

          <div className="w-full mt-6 flex flex-col items-center gap-4 px-4 md:flex-row md:justify-center md:gap-6">
            <button
              className="flex items-center gap-2 text-red-500 text-lg hover:text-red-600 transition"
              onClick={() => setFilterVisible(!filterVisible)}
            >
              <MdFilterList className="size-8" />
            </button>

            <div className="flex border-b-2 px-4 py-3 items-center w-full md:w-2/5 bg-gray-100 rounded-md">
              <FiSearch className="w-6 h-6 text-red-500" />
              <input
                type="text"
                placeholder="Buscar por nome, categoria ou status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {filterVisible && (
            <div className="w-full mt-4 bg-white shadow-md rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <SelectFilter
                  label="Categoria"
                  value={filters.category}
                  options={["Trabalho", "Projeto", "Pessoal"]}
                  onChange={(value) => handleChange('category', value)}
                />
                <SelectFilter
                  label="Status"
                  value={filters.status}
                  options={["Pendente", "Em andamento", "Concluído", "Atrasado"]}
                  onChange={(value) => handleChange('status', value)}
                />
                <SelectFilter
                  label="Prioridade"
                  value={filters.priority}
                  options={["Baixa", "Média", "Alta"]}
                  onChange={(value) => handleChange('priority', value)}
                />
            </div>
          )}

          <div className="mt-6 w-full bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto">
            <ul className="max-h-[340px] md:max-h-[420px] overflow-y-auto px-4 py-2 sm:px-6">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <li key={task.id} className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-6 border-b border-gray-200 hover:bg-gray-50 shadow-sm">
                    <div className="flex flex-col items-center sm:items-start">
                      <p className="text-base font-semibold text-red-600">{translateTaskKey(task.category)}</p>
                      <p className="text-gray-700 font-medium text-sm">
                        {new Date(task.start_date).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(task.start_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    <p className="text-gray-500 font-medium text-center sm:text-left">{task.name}</p>

                    <div className="flex flex-col items-center gap-2">
                      <span className={`text-xs font-bold py-2 px-4 rounded-full ${getStatusClass(task.status)}`}>
                        {translateTaskKey(task.status)}
                      </span>
                      <Link 
                        href={`${ROUTES.TASKS}/${task.id}`} 
                        className="bg-red-500 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-red-600 transition"
                      >
                        Detalhes
                      </Link>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center py-10 text-gray-400">Nenhuma tarefa encontrada.</p>
              )}
            </ul>
          </div>

          <div className="mt-8 flex justify-center w-full px-6">
            <ButtonLink 
                href={ROUTES.CREATE_TASK} 
                label="Adicionar novas Tarefas" 
                className="w-full sm:w-1/2 my-5 px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition text-center" 
            />
          </div>
        </ContentContainer>
        <SidebarImage src="/allTasks/listTaskImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
};

export default ListTasks;