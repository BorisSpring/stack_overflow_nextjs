import QuestionCard from '@/components/cards/QuestionCard';
import NoResult from '@/components/shared/NoResult';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { QuestionCardProps } from '@/lib/actions/shared.types';
import { getTagQuestions } from '@/lib/actions/tag.action';
import { URLProps } from '@/types';
import React from 'react';

const Page = async ({ params, searchParams }: URLProps) => {
  const tag = await getTagQuestions({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='h2-semibold text-dark-300 dark:text-light-900'>
        {tag.name}
      </h2>
      <LocalSearchBar
        iconPosition='left'
        route={`/tags/${params.id}`}
        otherClasses='flex-1'
        imgSrc='/assets/icons/search.svg'
        placeholder='Search for tag here...'
      />
      {tag !== undefined && tag.questions?.length > 0 ? (
        tag.questions.map((question: QuestionCardProps) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        ))
      ) : (
        <NoResult
          title='There’s no tag question to show'
          description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
          link='/ask-question'
          linkTitle='Ask a Question'
        />
      )}
    </div>
  );
};

export default Page;
