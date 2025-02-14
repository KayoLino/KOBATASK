'use client'

import useRequireAuth from '@/hooks/useRequireAuth';

const PrivateRoute = ({ children }) => {

  useRequireAuth();

  return (
    <>
      {children}
    </>
  );
}

export default PrivateRoute;