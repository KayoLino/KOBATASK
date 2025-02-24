'use client';
import NavBar from '@/components/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import PageTitle from '@/components/PageTitle';
import ProfileField from '@/components/ProfileField';
import ProfileImage from "@/components/ProfileImage";
import LayoutContainer from '@/components/LayoutConteiner';
import ContentContainer from '@/components/ContentConteiner';
import SidebarImage from '@/components/SideBarImg';
import ButtonLink from '@/components/ButtonLink';

import { useUser } from '@/hooks/useGetUser';


export default function Profile() {
  const { user, loading } = useUser();

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
          <PageTitle title="Meu Perfil" subtitle="Visualize suas informações de perfil." />
          <div className="my-6">
            <ProfileImage src={user?.imagem_perfil} />
          </div>
          <div className="flex justify-center items-center flex-col w-10/12 flex-grow space-y-4">
            <ProfileField label="Nome" value={user?.nome || "Nome não disponível"} />
            <ProfileField label="Email" value={user?.email || "E-mail não disponível"} />
            <ProfileField label="Senha" value="*********" />
            <ButtonLink href="/editProfile" label="Editar Perfil" className="w-1/2 my-5 px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition text-center" />
          </div>
        </ContentContainer>
        <SidebarImage src="/userProfile/profileImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
}
