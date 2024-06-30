'use client';
import { HomePageFilters } from '@/constants/filters';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeQueryFromUrl } from '@/lib/utils';

const HomeFilters = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsFilter = searchParams.get('filter');

  const [filter, setFilter] = useState(paramsFilter || '');

  if (pathName !== '/') return;

  const handleTypeClick = (value: string) => {
    let newUrl;
    if (filter === value) {
      setFilter('');
      newUrl = removeQueryFromUrl({
        params: searchParams.toString(),
        keysToRemove: ['filter'],
      });
    } else {
      setFilter(() => value);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value,
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className='mt-2 hidden flex-wrap gap-3 md:flex'>
      {HomePageFilters.map(({ name, value }) => (
        <Button
          key={value}
          onClick={() => handleTypeClick(value)}
          className={` body-medium rounded-[8px]  px-6 py-2 font-medium capitalize shadow-none lg:py-3 ${
            filter === value
              ? 'bg-orange-200 text-primary-500 '
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
