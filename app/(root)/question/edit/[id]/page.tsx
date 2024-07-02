import Question from '@/components/forms/Question';
import { ITag } from '@/database/tag.model';
import { getQuestionToBeEdited } from '@/lib/actions/question.action';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Edit Question',
  description: 'Edit Posted question that u asked for a help!',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
};

interface Props {
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const { userId } = auth();
  if (!userId) return null;

  const question = await getQuestionToBeEdited({
    id: params.id,
    clerkId: userId!,
  });

  if (!question) return null;

  return (
    <>
      <h1 className='h2-semibold my-10 text-dark-200 dark:text-light-800'>
        Edit Question
      </h1>
      <Question
        questionId={params.id}
        clerkId={userId}
        title={question.title}
        tags={question?.tags.map((tag: ITag) => tag.name)}
        content={question.content}
      />
    </>
  );
};

export default Page;
