'use client'
import Image from "next/image";
import NavBar from '@/components/Navbar';
import PrivateRoute from '@/components/PrivateRoute';
import LoadingSpinner from '@/components/LoadingSpinner';

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
      <div className="flex flex-col md:flex-row justify-between h-[calc(100vh-5rem)] overflow-hidden">
        <div className="p-8 w-full mx-auto xl:w-7/12 2xl:w-10/12 flex flex-col items-center">
          <div className="flex flex-col items-center rounded-b-3xl p-4 w-full sm:w-3/5 shadow-lg bg-white h-full overflow-hidden">
            <h1 className="text-lg 2xl:text-2xl font-medium mb-2 xl:mb-4">Meu Perfil</h1>
            <p className="text-gray-600 2xl:text-lg">Visualize suas informações de perfil.</p>

            <div className="my-6">
              <Image
                src={user?.imagem_perfil ? `http://localhost:8000${user.imagem_perfil}` : "/userProfile/userNotProfile.png"}
                alt="Foto de perfil"
                width={120}
                height={120}
                className="rounded-full border-4 border-gray-300 shadow-lg w-24 h-24 2xl:w-36 2xl:h-36 object-cover"
              />
            </div>

            <div className="flex justify-center items-center flex-col w-10/12 flex-grow space-y-4">
              <div className="w-full 2xl:space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome:</label>
                <p className="w-full 2xl:h-12 p-2 rounded-md border border-gray-300 shadow-md bg-gray-100">
                  {user?.nome || 'Não informado'}
                </p>
              </div>
              <div className="w-full 2xl:space-y-2 2xl:mt-4">
                <label className="text-sm font-medium text-gray-700">Email:</label>
                <p className="w-full 2xl:h-12 p-2 rounded-md border border-gray-300 shadow-md bg-gray-100">
                  {user?.email || 'Não informado'}
                </p>
              </div>
              <div className="w-full 2xl:space-y-2 2xl:mt-4">
                <label className="text-sm font-medium text-gray-700">Senha:</label>
                <p className="w-full 2xl:h-12 p-2 rounded-md border border-gray-300 shadow-md bg-gray-100">
                  *********
                </p>
              </div>

              <Link
                href='/editProfile'
                className="w-1/2 my-10 px-4 font-semibold py-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition text-center"
              >
                Editar Perfil
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/12 hidden md:block">
          <img className="w-full h-full object-cover rounded-lg shadow-md" src="/userProfile/profileImg.jpg" alt=" Illustration" />
        </div>
      </div>
    </PrivateRoute>
  );
}
