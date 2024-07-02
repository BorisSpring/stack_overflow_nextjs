import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import React from 'react';
import AnswerCard from './AnswerCard';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
  totalAnswers: number;
}

const AnswerTab = async ({
  userId,
  clerkId,
  searchParams,
  totalAnswers,
}: Props) => {
  if (totalAnswers < 1) {
    return (
      <p className='paragraph-semibold text-dark200_light800 mt-7'>
        User has not answered any question yet!{' '}
      </p>
    );
  }

  const answers = await getUserAnswers({
    author: userId,
    page: Number(searchParams.page) || 1,
  });

  return (
    <div className='mt-10 flex flex-col gap-5'>
      {answers.map((answer: any) => (
        <AnswerCard
          questionId={answer.question._id}
          questionCreatedAt={answer.question.createdAt}
          author={answer.author}
          upvotes={answer?.upvotes?.length || 0}
          answerId={JSON.stringify(answer._id)}
          questionTitle={answer.question.title}
          key={answer._id}
          createdAt={answer.createdAt}
          loggedUserClerkId={clerkId}
        />
      ))}
    </div>
  );
};

export default AnswerTab;
