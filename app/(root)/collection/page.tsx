import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { findSavedQuestions } from '@/lib/actions/user.action';
import QuestionCard from '@/components/cards/QuestionCard';
import NoResult from '@/components/shared/NoResult';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { QuestionFilters } from '@/constants/filters';
import Filter from '@/components/shared/Filter';
import { QuestionCardProps } from '@/lib/actions/shared.types';
import { SearchParamsProps } from '@/types';
import PaginationComponent from '@/components/shared/PaginationComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Saved Questions',
  description: 'Look at your account collection of saved questions',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
};

const page = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const results = await findSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.query,
    filter: searchParams.filter,
    page: Number(searchParams?.page) || 1,
  });

  return (
    <>
      <h2 className='h2-bold text-dark100_light900 text-center font-bold sm:text-left'>
        Saved Questions
      </h2>

      <div className='mt-11 flex flex-col justify-between gap-5  lg:flex-row '>
        <LocalSearchBar
          iconPosition='left'
          route='/'
          otherClasses='flex-1'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for Questions here...'
        />{' '}
        <Filter
          filters={QuestionFilters}
          otherClasses='md:min-h-[56px] min-w-[170px]'
          containerClasses=' max-md:flex'
        />
      </div>
      <div className='mt-6 flex w-full flex-col gap-6'>
        {results?.user?.saved !== undefined &&
        results.user.saved?.length > 0 ? (
          results.user.saved.map((question: QuestionCardProps) => (
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
            title='There’s no saved questions to show'
            description='Saved frist question to collection by click star icon on top rigth side of the question!'
            link='/'
            linkTitle='Visit Home'
          />
        )}
      </div>
      <PaginationComponent
        currentPage={Number(searchParams.page) || 1}
        totalPages={results?.totalPages}
      />
    </>
  );
};

export default page;
