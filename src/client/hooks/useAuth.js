'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { api } from '../lib/api';

const useAuth = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(api + "auth/authCheck", {
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            await axios.post(api + "auth/refresh-token", {}, { withCredentials: true });

            const response = await axios.get(api + "auth/authCheck", {
              withCredentials: true,
            });
            setUser(response.data.user);
          } catch (err) {
            router.push('/auth/login');
          }
        } else {
          setUser(null);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  return { user, loading };
};

export default useAuth;
