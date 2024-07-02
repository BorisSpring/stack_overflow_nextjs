import QuestionCard from '@/components/cards/QuestionCard';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import PaginationComponent from '@/components/shared/PaginationComponent';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import {
  getQuestions,
  getRecommendedQuestions,
} from '@/lib/actions/question.action';
import { QuestionCardProps } from '@/lib/actions/shared.types';
import { SearchParamsProps } from '@/types';
import { auth } from '@clerk/nextjs/server';

import Link from 'next/link';
import React from 'react';

const Home = async ({ searchParams }: SearchParamsProps) => {
  let result;
  const { userId: clerkId } = auth();

  const searchObject = {
    searchQuery: searchParams.query,
    page: Number(searchParams.page) || 1,
  };

  if (searchParams.filter === 'recommended') {
    if (clerkId) {
      result = await getRecommendedQuestions({ ...searchObject, clerkId });
    } else {
      result = { questions: [], totalPages: 0 };
    }
  } else {
    result = await getQuestions({
      ...searchObject,
      filter: searchParams.filter,
    });
  }
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h2-bold text-dark100_light900 text-center font-bold sm:text-left'>
          All Questions
        </h1>
        <Link href='/ask-a-question' className='flex justify-end '>
          <Button className='primary-gradient   paragraph-medium rounded-[10px] px-4 pt-3 text-light-900 max-sm:w-full '>
            Ask Question
          </Button>
        </Link>
      </div>
      <div className='mt-11 flex flex-col justify-between  gap-5 '>
        <LocalSearchBar
          iconPosition='left'
          route='/'
          otherClasses='flex-1'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for Questions here...'
        />{' '}
        <Filter
          filters={HomePageFilters}
          otherClasses='md:min-h-[56px] min-w-[170px]'
          containerClasses='hidden max-md:flex'
        />
      </div>
      <div className='mt-6 flex w-full flex-col gap-6'>
        {result?.questions?.length > 0 ? (
          result?.questions.map((question: QuestionCardProps) => (
            <QuestionCard
              clerkId={clerkId}
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
            title='There’s no question to show'
            description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
        )}
      </div>
      <PaginationComponent
        currentPage={Number(searchParams.page) || 1}
        totalPages={result?.totalPages || 0}
      />
    </>
  );
};

export default Home;
