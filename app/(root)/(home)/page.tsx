import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { useTheme } from '@/context/themeProvider';

const Home = () => {
  const { mode } = useTheme();

  return (
    <div>
      <p>home</p>
      {mode}
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};

export default Home;
