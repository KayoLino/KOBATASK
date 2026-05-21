import Link from "next/link";
import NavBar from '@/components/layout/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import PageTitle from '@/components/layout/PageTitle';
import LayoutContainer from '@/components/layout/LayoutContainer';
import ContentContainer from '@/components/layout/ContentContainer';
import { SidebarImage } from '@/components/layout';
import ButtonLink from '@/components/common/ButtonLink';
import LoadingSpinner from '@/components/LoadingSpinner';
import SelectFilter from '@/components/tasks/SelectFilter';

const About = () => {
  return (
    <PrivateRoute>
      <NavBar />
      <LayoutContainer>
        <ContentContainer>
          <PageTitle title="Sobre o KOBATASK" subtitle="Nossos principais objetivos!" />
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="text-lg leading-relaxed text-gray-700">
              O <span className="font-bold">KOBATASK</span> é uma plataforma <span className="text-red-500 font-bold">inteligente</span> de gerenciamento de tarefas projetada para tornar sua
              organização mais <span className="text-red-500 font-bold">eficiente</span> e <span className="text-red-500 font-bold">produtiva</span>. Nosso objetivo é ajudar você a <span className="font-bold">priorizar, acompanhar e concluir </span>
              suas tarefas de forma intuitiva e automatizada.
            </p>
            <div className="mt-6 bg-gray-100 p-4 rounded-md">
              <p className="mb-4 text-lg font-semibold">Com o <span className="font-bold">KOBATASK</span>, você pode:</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700"><span className="text-red-500 font-bold mr-2">✔</span> Criar, editar e organizar suas tarefas de maneira simples.</li>
                <li className="flex items-center text-gray-700"><span className="text-red-500 font-bold mr-2">✔</span> Acompanhar atualizações automáticas de status com base nas datas.</li>
                <li className="flex items-center text-gray-700"><span className="text-red-500 font-bold mr-2">✔</span> Pesquisar e filtrar tarefas rapidamente para encontrar o que precisa.</li>
                <li className="flex items-center text-gray-700"><span className="text-red-500 font-bold mr-2">✔</span> Receber notificações importantes sobre prazos e atualizações.</li>
                <li className="flex items-center text-gray-700"><span className="text-red-500 font-bold mr-2">✔</span> Personalizar seu perfil para uma experiência única.</li>
              </ul>
            </div>

            <div className="mt-8 text-center text-xl font-bold text-red-500">
              🚀 Organize suas tarefas de forma inteligente com o KOBATASK!
            </div>
          </div>
        </ContentContainer>
        <SidebarImage src="/homePage/home.png" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
}

export default About;