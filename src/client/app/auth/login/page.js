'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import ErrorMessage from '@/components/ErrorMessage';

import axios from "axios";

import { api } from "../../../lib/api";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      if (!email || !password) {
        setErrors('Preencha todos os campos.');
        return;
      }

      const res = await axios.post(api + "auth/login", { email, password }, { withCredentials: true });
      setErrors('');
      setEmail('');
      setPassword('');
      router.push('/home');

    } catch (error) {
      const errorMessage = error.response?.data?.errors?.[0] || 'Algo deu errado. Tente novamente mais tarde.';
      setErrors(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[url('/authImg/bgAuth.jpg')] bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center">
      <div className="bg-white w-full md:w-3/5 max-w-[1000px] h-auto md:h-4/5 rounded-2xl flex flex-col md:flex-row shadow-lg overflow-hidden bg-opacity-80">

        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 w-full md:w-7/12">
          {/* Titulo */}
          <h1 className="text-3xl md:text-3xl font-bold text-gray-800">Bem vindo(a) de volta!</h1>
          <p className="text-gray-600 mt-2 mb-6 font-medium">Por favor, entre com os detalhes da conta</p>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-4">Email</label>
              <input
                className="auth-input w-full p-3 border rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-4">Senha</label>
              <input
                className="auth-input w-full p-3 border rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-800">
              <Link href="register" className="hover:text-red-500 transition duration-300">Criar uma conta</Link>
              <Link href="#" className="hover:text-red-500 transition duration-300">Esqueceu sua senha?</Link>
            </div>
            <button className="w-full bg-red-500 rounded-2xl text-white py-3 mt-6 font-medium hover:bg-red-600 transition" disabled={isLoading}>Entrar</button>
            {errors && (<ErrorMessage message={errors} />
            )}
          </form>
        </div>

        {/* Imagem */}
        <div className="w-full md:w-5/12 hidden md:block">
          <img className="w-full h-full object-cover" src="/authImg/loginImg.jpg" alt="Login Illustration" />
        </div>

      </div>
    </div>
  );
}

export default Login;
