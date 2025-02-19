'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { api } from '../lib/api';
import { FiMenu, FiX } from 'react-icons/fi';

import { useUser } from '@/hooks/getUser';

interface User {
  imagem_perfil?: string;
  nome: string;
}

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const { user, loading } = useUser() as { user: User | null; loading: boolean };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(api + "auth/logout", {}, { withCredentials: true });
      router.push('/auth/login');
    } catch (error) {
      console.log("Ocorreu algum erro: " + error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [loading, user, router]);

  return (
    <div className="w-full h-20 py-2 px-6 md:px-10 bg-white flex justify-between items-center shadow-lg relative z-50">
      <Link href="/home" className="text-2xl font-bold text-red-500 cursor-pointer">KOBATASK</Link>

      {/* Menu Desktop */}
      <div className="hidden md:flex gap-10 items-center">
        <Link href="#" className="hover:text-red-400">Lista de Tarefas</Link>
        <Link href="/createTask" className="hover:text-red-400">Adicionar novas Tarefas</Link>
        <Link href="#" className="hover:text-red-400">O que é o KOBATASK?</Link>
      </div>

      <div className="hidden md:flex relative items-center gap-4 cursor-pointer" onClick={toggleMenu}>
        <img
          src={user?.imagem_perfil ? `http://localhost:8000${user.imagem_perfil}` : "/userProfile/userNotProfile.png"}
          alt="Foto de Perfil"
          className="w-10 h-10 rounded-full border-4 border-gray-300 shadow-lg"
        />
        <p className="font-medium">{user?.nome}</p>
        <div className={`absolute top-14 right-0 bg-white shadow-lg p-4 w-36 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <Link href="/profile" className="block py-2 hover:text-red-500">Meu Perfil</Link>
          <p className="py-2 cursor-pointer hover:text-red-500" onClick={handleLogout}>Sair</p>
        </div>
      </div>

      {/* Ícone do Menu Mobile */}
      <div className="md:hidden cursor-pointer text-2xl" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Menu Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg flex flex-col items-start gap-6 py-6 px-8 z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button className="self-end text-2xl text-gray-600 hover:text-red-500 transition-colors duration-200" onClick={toggleMobileMenu}><FiX /></button>

        <Link href="#" className="w-full text-lg font-semibold text-gray-700 py-2 hover:text-red-400 transition-colors duration-200" onClick={toggleMobileMenu}>Lista de Tarefas</Link>
        <Link href="/createTask" className="w-full text-lg font-semibold text-gray-700 py-2 hover:text-red-400 transition-colors duration-200" onClick={toggleMobileMenu}>Adicionar novas Tarefas</Link>
        <Link href="#" className="w-full text-lg font-semibold text-gray-700 py-2 hover:text-red-400 transition-colors duration-200" onClick={toggleMobileMenu}>O que é o KOBATASK?</Link>

        <hr className="w-full border-t mt-4 border-gray-200" />

        <div className="flex items-center gap-4 w-full mt-4">
          <img
            src={user?.imagem_perfil ? `http://localhost:8000${user.imagem_perfil}` : "/userProfile/userNotProfile.png"}
            alt="Foto de Perfil"
            className="w-12 h-12 rounded-full object-cover border-4 border-gray-300 shadow-lg"
          />
          <p className="text-sm font-medium text-gray-700">{user?.nome}</p>
        </div>

        <div className="flex flex-col items-start w-full mt-2 gap-2">
          <Link href="/profile" className="w-full text-sm text-gray-600 py-1 hover:text-red-500 transition-colors duration-200">Meu Perfil</Link>
          <p className="w-full text-sm text-gray-600 py-1 cursor-pointer hover:text-red-500 transition-colors duration-200" onClick={handleLogout}>Sair</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
