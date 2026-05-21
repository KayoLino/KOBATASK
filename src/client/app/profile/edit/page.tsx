'use client';

import { useRouter } from 'next/navigation';
import NavBar from '@/components/layout/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import { LoadingSpinner } from '@/components/ui';
import PageTitle from '@/components/layout/PageTitle';
import LayoutContainer from '@/components/layout/LayoutContainer';
import ContentContainer from '@/components/layout/ContentContainer';
import { SidebarImage } from '@/components/layout';
import ArrowBack from '@/components/layout/ArrowBack';
import { ProfileForm } from '@/components/profile';
import { ProfileFormData } from '@/types/forms';
import useAuth from '@/hooks/useAuth';
import { userService } from '@/services/user.service';
import { ROUTES } from '@/helpers/constants';

export default function EditProfile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleUpdateProfile = async (data: ProfileFormData) => {
    await userService.updateProfile(data);
    alert('Perfil atualizado com sucesso!');
    router.push(ROUTES.PROFILE);
  };

  if (loading) {
    return (
      <PrivateRoute>
        <NavBar />
        <LoadingSpinner />
      </PrivateRoute>
    );
  }

  if (!user) return null;

  return (
    <PrivateRoute>
      <NavBar />
      <LayoutContainer>
        <ContentContainer>
          <ArrowBack href={ROUTES.PROFILE} />
          
          <PageTitle 
            title="Edição de Perfil" 
            subtitle="Edite seu perfil da melhor forma." 
          />

          <div className="flex justify-center items-center flex-col w-10/12 flex-grow space-y-4">
            <ProfileForm
              initialData={{
                name: user.name,
                email: user.email,
                profileImage: user.image,
              }}
              onSubmit={handleUpdateProfile}
            />
          </div>
        </ContentContainer>
        <SidebarImage src="/userProfile/profileImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
}