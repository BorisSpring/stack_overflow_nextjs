'use client';
import { HomePageFilters } from '@/constants/filters';
import React from 'react';
import { Button } from '../ui/button';

const HomeFilters = () => {
  const isActive = 'frequent';
  return (
    <div className='mt-2 hidden flex-wrap gap-3 md:flex'>
      {HomePageFilters.map(({ name, value }) => (
        <Button
          key={value}
          onClick={() => {}}
          className={` body-medium rounded-[8px]  px-6 py-2 font-medium capitalize shadow-none lg:py-3 ${
            isActive === value
              ? 'bg-orange-200 text-primary-500'
              : ' text-dark500_light500 bg-light-800 hover:bg-light-700  hover:text-light-500 dark:bg-dark-300 hover:dark:bg-dark-400 hover:dark:text-light-900 '
          }`}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
