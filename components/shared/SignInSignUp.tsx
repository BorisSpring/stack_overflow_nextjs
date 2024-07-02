'use client';
import { useTheme } from '@/context/themeProvider';
import { SignIn, SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

interface Props {
  isSignIn?: boolean;
}
const SignInSignUp = ({ isSignIn }: Props) => {
  const { mode } = useTheme();
  return (
    <section className='flex-center min-h-screen w-full flex-col bg-light-700 dark:bg-dark-100'>
      <div className={`absolute w-[70%]`}>
        <Image
          src={`/assets/images/${
            mode === 'dark' ? 'auth-dark' : 'auth-light'
          }.png`}
          alt='background image'
          layout='responsive'
          width={800}
          height={600}
          className='object-cover'
        />
      </div>
      {isSignIn ? <SignIn /> : <SignUp />}
    </section>
  );
};

export default SignInSignUp;
