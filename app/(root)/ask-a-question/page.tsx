import Question from '@/components/forms/Question';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: 'Devflow Home Page',
  description:
    'Login page for devlow application with over 1,000,000 active users daily!',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
};

const AskQuestion = async () => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({
    userId,
  });

  if (!mongoUser?._id) redirect('/sign-in');

  return (
    <div>
      <h1 className='h1-bold text-dark100_light900 '>Ask a Question</h1>
      <div className='mt-9'>
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
