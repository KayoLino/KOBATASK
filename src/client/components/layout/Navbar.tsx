'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

import useAuth from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';
import { ROUTES, APP_NAME } from '@/helpers/constants';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { user, loading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push(ROUTES.LOGIN);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const getProfileImage = () => {
    if (user?.image) {
      return user.image;
    }
    return "/userProfile/userNotProfile.png";
  };

  const getUserName = () => {
    return user?.name || 'Usuário';
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="w-full h-20 py-2 px-6 md:px-10 bg-white flex justify-between items-center shadow-lg relative z-50">
      {/* Logo */}
      <Link 
        href={ROUTES.HOME} 
        className="text-2xl font-bold text-red-500 cursor-pointer hover:text-red-600 transition-colors"
      >
        {APP_NAME}
      </Link>

      {/* Menu Desktop */}
      <div className="hidden md:flex gap-10 items-center">
        <Link
          href={ROUTES.TASKS}
          className={`hover:text-red-400 transition-colors ${
            pathname === ROUTES.TASKS ? "text-red-500 font-bold" : ""
          }`}
        >
          Lista de Tarefas
        </Link>
        <Link
          href={ROUTES.CREATE_TASK}
          className={`hover:text-red-400 transition-colors ${
            pathname === ROUTES.CREATE_TASK ? "text-red-500 font-bold" : ""
          }`}
        >
          Adicionar novas Tarefas
        </Link>
        <Link
          href={ROUTES.ABOUT}
          className={`hover:text-red-400 transition-colors ${
            pathname === ROUTES.ABOUT ? "text-red-500 font-bold" : ""
          }`}
        >
          O que é o {APP_NAME}?
        </Link>
      </div>

      {/* User Menu Desktop */}
      <div 
        className="hidden md:flex relative items-center gap-4 cursor-pointer" 
        onClick={toggleMenu}
      >
        <img
          src={getProfileImage()}
          alt="Foto de Perfil"
          className="w-10 h-10 rounded-full border-4 border-gray-300 shadow-lg object-cover"
        />
        <p className="font-medium">{getUserName()}</p>
        
        {/* Dropdown Menu */}
        <div 
          className={`absolute top-14 right-0 bg-white shadow-lg rounded-md p-4 w-36 transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <Link 
            href={ROUTES.PROFILE} 
            className="block py-2 hover:text-red-500 transition-colors"
          >
            Meu Perfil
          </Link>
          <button 
            className="w-full text-left py-2 cursor-pointer hover:text-red-500 transition-colors" 
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>

      {/* Ícone do Menu Mobile */}
      <button 
        className="md:hidden cursor-pointer text-2xl" 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Menu Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg flex flex-col items-start gap-6 py-6 px-8 z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button 
          className="self-end text-2xl text-gray-600 hover:text-red-500 transition-colors duration-200" 
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          <FiX />
        </button>

        {/* Mobile Navigation Links */}
        <Link
          href={ROUTES.TASKS}
          className={`w-full text-lg font-semibold py-2 transition-colors duration-200 ${
            pathname === ROUTES.TASKS 
              ? "text-red-500 font-bold" 
              : "text-gray-700 hover:text-red-400"
          }`}
          onClick={toggleMobileMenu}
        >
          Lista de Tarefas
        </Link>
        <Link
          href={ROUTES.CREATE_TASK}
          className={`w-full text-lg font-semibold py-2 transition-colors duration-200 ${
            pathname === ROUTES.CREATE_TASK 
              ? "text-red-500 font-bold" 
              : "text-gray-700 hover:text-red-400"
          }`}
          onClick={toggleMobileMenu}
        >
          Adicionar novas Tarefas
        </Link>
        <Link
          href={ROUTES.ABOUT}
          className={`w-full text-lg font-semibold py-2 transition-colors duration-200 ${
            pathname === ROUTES.ABOUT 
              ? "text-red-500 font-bold" 
              : "text-gray-700 hover:text-red-400"
          }`}
          onClick={toggleMobileMenu}
        >
          O que é o {APP_NAME}?
        </Link>

        <hr className="w-full border-t mt-4 border-gray-200" />

        {/* User Info Mobile */}
        <div className="flex items-center gap-4 w-full mt-4">
          <img
            src={getProfileImage()}
            alt="Foto de Perfil"
            className="w-12 h-12 rounded-full object-cover border-4 border-gray-300 shadow-lg"
          />
          <p className="text-sm font-medium text-gray-700">{getUserName()}</p>
        </div>

        {/* User Actions Mobile */}
        <div className="flex flex-col items-start w-full mt-2 gap-2">
          <Link 
            href={ROUTES.PROFILE} 
            className="w-full text-sm text-gray-600 py-1 hover:text-red-500 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            Meu Perfil
          </Link>
          <button 
            className="w-full text-left text-sm text-gray-600 py-1 cursor-pointer hover:text-red-500 transition-colors duration-200" 
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </aside>
    </nav>
  );
};

export default NavBar;