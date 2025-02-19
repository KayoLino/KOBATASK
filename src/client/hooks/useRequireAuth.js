'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";

const useRequireAuth = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user === null) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  return { user, loading };
};

export default useRequireAuth;
