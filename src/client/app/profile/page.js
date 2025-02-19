'use client'
import Image from "next/image";
import NavBar from '@/components/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import PageTitle from '@/components/PageTitle';
import ProfileField from '@/components/ProfileField';
import ProfileImage from "@/components/ProfileImage";
import LayoutContainer from '@/components/LayoutConteiner';
import ContentContainer from '@/components/ContentConteiner';
import SidebarImage from '@/components/SideBarImg';
import ButtonEdit from '@/components/ButtonEdit';

import axios from "axios";
import { api } from "../../lib/api";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUser } from '@/hooks/getUser';

import { useUser } from '@/hooks/getUser';

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
            <ProfileField label="Nome" value={user?.nome} />
            <ProfileField label="Email" value={user?.email} />
            <ProfileField label="Senha" value="*********" />
            <ButtonEdit href="/editProfile" label="Editar Perfil" />
          </div>
        </ContentContainer>
        <SidebarImage src="/userProfile/profileImg.jpg" alt="Illustration" />
      </LayoutContainer>
    </PrivateRoute>
  );
}
