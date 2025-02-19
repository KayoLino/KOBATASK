'use client'
import Image from "next/image";

import NavBar from '@/components/Navbar';

import useRequireAuth from '@/hooks/useRequireAuth';

import PrivateRoute from '@/components/PrivateRoute';

const Home: React.FC = () => {

  return (
    <PrivateRoute>
      <NavBar />
    </PrivateRoute>
  );
}

export default Home;
