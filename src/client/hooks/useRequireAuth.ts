'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";

const useRequireAuth = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  return { user, loading };
};

export default useRequireAuth;
