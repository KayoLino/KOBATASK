'use client';

import useRequireAuth from '@/hooks/useRequireAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useRequireAuth();

  if (loading) return <LoadingSpinner />;

  return user ? <>{children}</> : null;
};

export default PrivateRoute;
