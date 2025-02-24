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
import SelectFilter from '@/components/SelectFilter';

import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";

import { useState } from 'react';
import useFetchTasks from '@/hooks/useFetchTasks';

const ListTasks = () => {

  const { tasks, loading, error } = useFetchTasks();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState({
    categoria: "",
    status: "",
    prioridade: "",
  });
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  const handleChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value
    }));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearchTerm = task.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = filters.categoria ? task.categoria === filters.categoria : true;
    const matchesStatus = filters.status ? task.status === filters.status : true;
    const matchesPrioridade = filters.prioridade ? task.prioridade === filters.prioridade : true;

    return matchesSearchTerm && matchesCategoria && matchesStatus && matchesPrioridade;
  });

  if (loading) {
    return (
      <PrivateRoute>
        <NavBar />
        <LoadingSpinner />
      </PrivateRoute>
    );
  }

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
      case 'Pendente':
        return 'bg-transparent border border-blue-500 text-blue-500';
      case 'Em andamento':
        return 'bg-transparent border border-yellow-500 text-yellow-500';
      case 'Atrasado':
        return 'bg-transparent border border-red-500 text-red-500';
      case 'Concluída':
        return 'bg-transparent border border-green-500 text-green-500';
      default:
        return '';
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
                placeholder="Buscar tarefas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 text-gray-700 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {filterVisible && (
            <div className="w-full mt-4 bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Filtrar Tarefas</h3>

              <div className="flex flex-col gap-3">
                <SelectFilter
                  label="Categoria"
                  value={filters.categoria}
                  options={["Trabalho", "Projeto", "Pessoal"]}
                  onChange={(value) => handleChange('categoria', value)}
                />

                <SelectFilter
                  label="Status"
                  value={filters.status}
                  options={["Pendente", "Em andamento", "Concluída", "Atrasado"]}
                  onChange={(value) => handleChange('status', value)}
                />

                <SelectFilter
                  label="Prioridade"
                  value={filters.prioridade}
                  options={["Baixa", "Média", "Alta"]}
                  onChange={(value) => handleChange('prioridade', value)}
                />
              </div>
            </div>
          )}

          <div className="mt-6 w-full bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto">
            <ul className="max-h-[340px] md:max-h-[420px] overflow-y-auto px-4 py-2 sm:px-6">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <li key={task.id} className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6 py-6 border-b border-gray-200 hover:bg-gray-50 text-center sm:text-left shadow-sm">
                    <div className="flex flex-col items-center sm:items-start">
                      <p className="text-base font-semibold text-red-600">{task.categoria}</p>
                      <p className="text-gray-700 font-medium text-sm lg:text-nowrap">{new Date(task.dataInicio).toLocaleDateString()}</p>
                      <p className="text-gray-400 text-sm">{new Date(task.dataInicio).toLocaleTimeString()}</p>
                    </div>

                    <p className="text-gray-500 2xl:text-lg text-center text-nowrap sm:text-left lg:text-sm">{task.nome}</p>

                    <div className="flex flex-col items-center">
                      <span className={`text-sm font-semibold py-2 px-4 rounded-full text-nowrap ${getStatusClass(task.status)}`}>
                        {task.status}
                      </span>
                      <Link href={`/task/${task.id}`} className="bg-red-500 text-nowrap text-white mt-3 block py-2 px-4 rounded-full  text-sm font-semibold hover:bg-red-600">
                        Exibir detalhes
                      </Link>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center">Nenhuma tarefa encontrada.</p>
              )}
            </ul>
          </div>

          <div className="mt-8 flex justify-center w-full px-6">
            <ButtonLink href="/createTask" label="Criar nova Tarefa" className="w-1/2 my-5 px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition text-center" />
          </div>
        </ContentContainer>

        <SidebarImage src="/allTasks/listTaskImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
};

export default ListTasks;
