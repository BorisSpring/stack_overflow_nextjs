import QuestionCard from '@/components/cards/QuestionCard';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';

import Link from 'next/link';
import React from 'react';

const questions = [
  {
    _id: '1',
    title:
      'The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this',
    tags: [
      { _id: '1', name: 'javascript', totalQuestions: 2222 },
      { _id: '2', name: 'next', totalQuestions: 2222 },
      { _id: '3', name: 'react', totalQuestions: 2222 },
    ],
    author: {
      _id: '11',
      picture: 'avatar.svg',
      name: 'Boris',
    },
    createdAt: new Date(),
    views: 5200,
    answers: 900,
    upvotes: 1200,
  },
];

const Home = () => {
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h2 className='h2-bold text-dark100_light900 text-center font-bold sm:text-left'>
          All Questions
        </h2>
        <Link href='/ask-question' className='flex justify-end '>
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
        {questions?.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question._id} {...question} />
          ))
        ) : (
          <NoResult
            linkTitle='Ask a Question'
            title='There’s no question to show'
            link='/ask-a-question'
            description='Be the first to break the silence! 🚀 Ask a Question and kickstart the
              discussion. our query could be the next big thing others learn from. Get
              involved! 💡'
          />
        )}
      </div>
    </>
  );
};

export default Home;
