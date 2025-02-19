'use client'

import useRequireAuth from '@/hooks/useRequireAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useRequireAuth();

  if (loading) return null;

  return user ? <>{children}</> : null;
};

export default PrivateRoute;
