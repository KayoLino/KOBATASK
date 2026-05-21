'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  AuthLayout, 
  AuthCard, 
  AuthInput, 
  AuthButton, 
  AuthHeader,
  AuthLink 
} from '@/components/auth';
import { ErrorMessage } from '@/components/ui';
import { authService } from '@/services/auth.service';
import { handleApiError, logError } from '@/utils/errorHandler';
import { ROUTES, ERROR_MESSAGES } from '@/helpers/constants';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors('');

    if (!email || !password) {
      setErrors(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });
      
      console.log('Login realizado com sucesso:', response);
      console.log('Token salvo:', authService.getToken());
      console.log('Usuário:', response.user);
      
      setEmail('');
      setPassword('');
      
      router.push(ROUTES.HOME);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setErrors(errorMessage);
      logError(error, 'Login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard 
        imageUrl="/authImg/loginImg.jpg" 
        imageAlt="Login Illustration"
        imagePosition="right"
      >
        <AuthHeader
          title="Bem vindo(a) de volta!"
          subtitle="Por favor, entre com os detalhes da conta"
        />

        <form onSubmit={handleLogin}>
          <AuthInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoComplete="email"
            required
          />

          <AuthInput
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="current-password"
            required
          />

          <div className="flex justify-between text-sm text-gray-800 mb-4">
            <Link 
              href={ROUTES.REGISTER} 
              className="hover:text-red-500 transition duration-300"
            >
              Criar uma conta
            </Link>
            <Link 
              href="#" 
              className="hover:text-red-500 transition duration-300"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <AuthButton 
            isLoading={isLoading}
            loadingText="Entrando..."
          >
            Entrar
          </AuthButton>

          {errors && <ErrorMessage message={errors} />}
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;