import { useState, useEffect } from 'react';
import axios from "axios";
import { api } from "../lib/api";

interface User {
  imagem_perfil?: string;
  nome: string;
  email: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${api}users/profile`, { withCredentials: true });
        setUser(res.data.user);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};
