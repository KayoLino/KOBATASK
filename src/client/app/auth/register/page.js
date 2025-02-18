'use client'

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { api } from '../../../lib/api';
import { useRouter } from 'next/navigation';

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('');

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      setIsLoading(true);

      if (!name || !email || !password || !confirmPassword) {
        setErrors("Preencha todos os campos!");
        return;
      }

      const res = await axios.post(api + "auth/register", { email, name, password, confirmPassword });

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors('');

      router.push('/auth/login');
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.[0] || 'Algo deu errado. Tente novamente mais tarde.';
      setErrors(errorMessage);
      console.log(error.response?.data?.errors?.[0])
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-[url('/authImg/bgAuth.jpg')] bg-cover bg-no-repeat bg-center flex justify-center items-center min-h-screen p-4">
      <div className="bg-white w-full md:w-4/5 lg:w-3/5 max-w-[1000px] rounded-2xl flex flex-col md:flex-row shadow-lg overflow-hidden bg-opacity-80">
        {/* Imagem */}
        <div className="hidden md:block md:w-2/5">
          <img
            src="/authImg/registerImg.jpg"
            className="w-full h-full object-cover"
            alt="Register Illustration"
          />
        </div>

        {/* Formulário */}
        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 w-full md:w-3/5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Bem vindo(a) ao KOBATASK
          </h1>
          <p className="text-gray-600 mb-6">Crie sua conta e organize suas tarefas!</p>

          <form className="space-y-4" onSubmit={e => handleRegister(e)}>
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Nome</label>
              <input
                type="text"
                className="auth-input w-full p-3 border rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                onChange={e => setName(e.currentTarget.value)}
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">Email</label>
              <input
                type="email"
                className="auth-input w-full p-3 border rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                onChange={e => setEmail(e.currentTarget.value)}
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">Senha</label>
              <input
                type="password"
                className="auth-input w-full p-3 border rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                onChange={e => setPassword(e.currentTarget.value)}
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">Confirmar senha</label>
              <input
                type="password"
                className="auth-input w-full p-3 border rounded-2xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                onChange={e => setConfirmPassword(e.currentTarget.value)}
              />
            </div>

            <div className="text-sm text-gray-600 mb-4">
              Já possui uma conta?{' '}
              <Link href="login" className="text-blue-500 hover:underline">Clique aqui</Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              Cadastrar-se
            </button>
            {errors && (
              <div className="mt-4 p-3 text-center bg-red-100 text-red-600 rounded-lg">
                {errors}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;