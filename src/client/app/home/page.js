'use client'
import Image from "next/image";

import NavBar from '@/components/Navbar';

import useRequireAuth from '@/hooks/useRequireAuth';

import PrivateRoute from '@/components/PrivateRoute';

export default function Home() {

  return (
    <PrivateRoute>
      <NavBar />
    </PrivateRoute>
  );
}
