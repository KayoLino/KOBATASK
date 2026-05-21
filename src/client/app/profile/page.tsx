'use client';

import NavBar from '@/components/layout/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import { LoadingSpinner } from '@/components/ui';
import PageTitle from '@/components/layout/PageTitle';
import LayoutContainer from '@/components/layout/LayoutContainer';
import ContentContainer from '@/components/layout/ContentContainer';
import { SidebarImage } from '@/components/layout';
import ButtonLink from '@/components/common/ButtonLink';
import { ProfileImage, ProfileField } from '@/components/profile';
import useAuth from '@/hooks/useAuth';

export default function Profile() {
  const { user, loading } = useAuth();

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
          <PageTitle 
            title="Meu Perfil" 
            subtitle="Visualize suas informações de perfil." 
          />
          
          <div className="my-6 flex justify-center">
            <ProfileImage src={user?.image} size="md" />
          </div>

          <div className="flex justify-center items-center flex-col w-10/12 flex-grow space-y-4">
            <ProfileField 
              label="Nome" 
              value={user?.name} 
            />
            <ProfileField 
              label="Email" 
              value={user?.email} 
            />
            <ProfileField 
              label="Senha" 
              value="*********" 
            />
            
            <ButtonLink 
              href="/profile/edit" 
              label="Editar Perfil" 
              className="w-1/2 my-5 px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition text-center" 
            />
          </div>
        </ContentContainer>
        <SidebarImage src="/userProfile/profileImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
}