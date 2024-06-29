import React from 'react';
import QuestionCard from '../cards/QuestionCard';
import { QuestionCardProps } from '@/lib/actions/shared.types';
import { getUserTopQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
  totalQuestions: number;
}

const QuestionTab = async ({
  userId,
  searchParams,
  clerkId,
  totalQuestions,
}: Props) => {
  if (totalQuestions < 1) {
    return (
      <p className='paragraph-semibold text-dark200_light800'>
        User has not asked any question yet!{' '}
      </p>
    );
  }

  const questions = await getUserTopQuestions({ author: userId, page: 1 });

  return (
    <div className='mt-10 flex flex-col gap-5 '>
      {questions.map((question: QuestionCardProps) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </div>
  );
};

export default QuestionTab;
