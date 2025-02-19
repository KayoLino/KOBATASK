'use client'

import useRequireAuth from '@/hooks/useRequireAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useRequireAuth();

  if (loading) return null;

  return user ? <>{children}</> : null;
};

export default PrivateRoute;
