import Question from '@/components/forms/Question';
import { ITag } from '@/database/tag.model';
import { getQuestionToBeEdited } from '@/lib/actions/question.action';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

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
