'use client';

import { useState, ChangeEvent } from 'react';
import PrivateRoute from '@/components/PrivateRoute';
import NavBar from '@/components/Navbar';
import LoadingSpinner from '@/components/LoadingSpinner';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import LayoutContainer from '@/components/LayoutConteiner';
import ContentContainer from '@/components/ContentConteiner';
import SidebarImage from '@/components/SideBarImg';

const CreateTask: React.FC = () => {
  const [category, setCategory] = useState<string>('Trabalho');
  const [priority, setPriority] = useState<string>('Média');

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  return (
    <PrivateRoute>
      <NavBar />
      <LayoutContainer>
        <ContentContainer>
          <PageTitle title="Criar nova Tarefa" subtitle="Crie tarefas para ter uma vida mais organizada!" />
          <form className="flex justify-center items-center flex-col w-full sm:w-10/12 flex-grow space-y-4">
            <InputField label="Nome" type="text" className="w-full" />

            <Select
              label="Categoria:"
              value={category}
              onChange={handleCategoryChange}
              options={[
                { value: 'Trabalho', label: 'Trabalho' },
                { value: 'Pessoal', label: 'Pessoal' },
                { value: 'Estudo', label: 'Estudo' },
              ]}
            />

            <TextArea label="Descrição" className="w-full h-20 sm:h-24" />

            <div className="w-full flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:gap-4">
              <div className="w-full sm:w-1/2">
                <InputField label="Data de início" type="date" className="w-full" />
              </div>
              <div className="w-full sm:w-1/2">
                <InputField label="Data de fim" type="date" className="w-full" />
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

            <Button className="w-full sm:w-1/2 my-6 sm:my-10">Criar nova Tarefa</Button>
          </form>
        </ContentContainer>
        <SidebarImage src="/createTask/createTaskImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
};

export default CreateTask;
