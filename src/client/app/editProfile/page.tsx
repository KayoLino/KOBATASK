'use client';
import NavBar from '@/components/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import ImageUploader from '@/components/ImageUploader';
import PageTitle from '@/components/PageTitle';
import ErrorMessage from '@/components/ErrorMessage';
import LayoutContainer from '@/components/LayoutConteiner';
import ContentContainer from '@/components/ContentConteiner';
import SidebarImage from '@/components/SideBarImg';
import ArrowBack from '@/components/ArrowBack';

import { useRouter } from 'next/navigation';
import axios from "axios";
import { api, localhost } from "@/lib/api";
import { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { useUser } from '@/hooks/useGetUser';
import { useUpdateProfileValidation } from '@/hooks/useUpdateProfileValidation';

interface Error {
  response?: {
    data?: {
      errors?: string[];
    };
  };
}

export default function EditProfile() {
  const { user } = useUser();
  const [image, setImage] = useState<File | string | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const checkInputs = useMemo(() => {
    if (user) {
      return useUpdateProfileValidation(user, name, email, newPassword, previewImage);
    }
    return false;
  }, [user, name, email, currentPassword, newPassword, previewImage]);

  useEffect(() => {
    if (user) {
      setName(user.nome || '');
      setEmail(user.email || '');
      setImage(user.imagem_perfil ? `${localhost}${user.imagem_perfil}` : "/userProfile/userNotProfile.png");
      setLoading(false);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("nome", name);
      formData.append("email", email);

      if (currentPassword) {
        formData.append("senhaAtual", currentPassword);
      }
      if (currentPassword && newPassword) {
        formData.append("novaSenha", newPassword);
      }
      if (image && image instanceof File) {
        formData.append("imagem_perfil", image);
      }

      await axios.put(api + "/users/update", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Perfil atualizado com sucesso!");
      await router.push('/profile');
    } catch (error: Error | any) {
      setError(error.response?.data?.errors?.[0] || error.message || "Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
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
      <NavBar />
      <LayoutContainer>
        <ContentContainer>

          <ArrowBack href='/profile' />

          <PageTitle title="Edição de Perfil" subtitle="Edite seu perfil da melhor forma." />

          <ImageUploader
            image={image}
            setImage={setImage}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />

          <form className="flex justify-center items-center flex-col w-10/12 flex-grow">
            <InputField label="Nome" type="text" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            <InputField label="Email" type="text" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <InputField label="Senha atual" type="password" value={currentPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)} />
            <InputField label="Nova senha" type="password" value={newPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} />

            <Button
              onClick={handleUpdateProfile}
              disabled={!checkInputs}
              children="Confirmar"
              className={checkInputs ? "w-1/2 my-4 px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition" : "w-1/2 my-10 px-4 font-semibold py-3 bg-red-900 cursor-not-allowed text-gray-400 rounded-3xl transition"}
            />

            {error && <ErrorMessage message={error} />}
          </form>
        </ContentContainer>
        <SidebarImage src="/userProfile/profileImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
}
