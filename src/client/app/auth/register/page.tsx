'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
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

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>('');

  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors('');

    if (!name || !email || !password || !confirmPassword) {
      setErrors(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register({ 
        name, 
        email, 
        password, 
        password_confirmation: confirmPassword 
      });

      console.log('Registro realizado com sucesso:', response);

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      router.push(ROUTES.LOGIN);
    } catch (error) {
      const errorMessage = handleApiError(error);
      setErrors(errorMessage);
      logError(error, 'Register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard 
        imageUrl="/authImg/registerImg.jpg" 
        imageAlt="Register Illustration"
        imagePosition="left"
      >
        <AuthHeader
          title="Bem vindo(a) ao KOBATASK"
          subtitle="Crie sua conta e organize suas tarefas!"
        />

        <form onSubmit={handleRegister} className="space-y-4">
          <AuthInput
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            autoComplete="name"
            required
          />

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
            autoComplete="new-password"
            required
          />

          <AuthInput
            label="Confirmar senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="new-password"
            required
          />

          <AuthButton 
            isLoading={isLoading}
            loadingText="Criando conta..."
          >
            Criar conta
          </AuthButton>

          {errors && <ErrorMessage message={errors} />}

          <AuthLink
            text="Já possui uma conta?"
            linkText="Faça login"
            href={ROUTES.LOGIN}
          />
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default RegisterPage;