import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

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
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchBar
          iconPosition='left'
          route='/'
          otherClasses='flex-1'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for Questions here...'
        />{' '}
        Filters
      </div>
    </>
  );
};

export default Home;
