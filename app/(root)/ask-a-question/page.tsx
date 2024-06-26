import Question from '@/components/forms/Question';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const AskQuestion = async () => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({
    // mock
    userId: 'd21b1f80-21c4-44e0-92ef-a0cfaeb6f472',
  });

  return (
    <div>
      <h1 className='h1-bold text-dark100_light900 '>Ask a Question</h1>
      <div className='mt-9'>
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
