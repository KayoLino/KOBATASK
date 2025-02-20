'use client'

import NavBar from '@/components/Navbar';

import PrivateRoute from '@/components/PrivateRoute';

const Home: React.FC = () => {

  return (
    <PrivateRoute>
      <NavBar />
    </PrivateRoute>
  );
}

export default Home;
