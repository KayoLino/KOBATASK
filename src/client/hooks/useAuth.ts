'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user';
import { storage } from '@/utils/storage';
import { userService } from '@/services/user.service';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = storage.getToken();

        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const storedUser = storage.getUser<User>();
        if (storedUser) {
          setUser(storedUser);
        }

        try {
          const response = await userService.getProfile();
          setUser(response.user);
          storage.setUser(response.user); 
        } catch (error) {
          console.error('Erro ao buscar perfil:', error);
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const isAuthenticated = !!storage.getToken();

  return {user, loading, isAuthenticated};
};

export default useAuth;