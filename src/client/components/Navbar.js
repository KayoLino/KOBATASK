'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { api } from '../lib/api';
import useAuth from '@/hooks/useAuth';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const { user, loading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(api + "auth/logout", {}, { withCredentials: true });
      router.push('/auth/login');
    } catch (error) {
      console.log("Ocorreu algum erro: " + error)
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [loading, user, router]);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="w-full h-20 py-2 px-10 bg-white flex justify-between items-center shadow-lg">
      <Link href="/home" className="text-2xl font-bold text-red-500 cursor-pointer">KOBATASK</Link>
      <div className="flex gap-10">
        <Link href="#" className="hover:text-red-400">Lista de Tarefas</Link>
        <Link href="#" className="hover:text-red-400">Adicionar novas Tarefas</Link>
        <Link href="#" className="hover:text-red-400">O que é o KOBATASK?</Link>
      </div>

      <div className="flex justify-center items-center gap-4">
        {user?.img ? <img src={user.img} alt="Foto de Perfil" className="w-10 h-10 cursor-pointer" onClick={toggleMenu} /> : <img src="/userProfile/userNotProfile.png" alt="Foto de Perfil" className="w-10 h-10 cursor-pointer" onClick={toggleMenu} />}
        <p className="font-medium cursor-pointer" onClick={toggleMenu}>{user?.nome}</p>

        {isMenuOpen && (
          <div
            className="absolute top-20 right-10 bg-white shadow-lg p-4  w-36 "
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/profile" className="block py-2 hover:text-red-500">Meu Perfil</Link>
            <p className="py-2 cursor-pointer hover:text-red-500" onClick={handleLogout}>Sair</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default NavBar;
