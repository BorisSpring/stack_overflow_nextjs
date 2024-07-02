import React from 'react';
import { Metadata } from 'next';
import SignInSignUp from '@/components/shared/SignInSignUp';

export const metadata: Metadata = {
  title: 'Devflow Sign Up',
  description:
    'Login page for devlow application with over 1,000,000 active users daily!',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
};

const Page = () => {
  return (
    <>
      <SignInSignUp isSignIn={false} />
    </>
  );
};

export default Page;
