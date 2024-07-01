'use client';
import { formUrlQuery, removeQueryFromUrl } from '@/lib/utils';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { GlobalSearchFilters } from '@/constants/filters';

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get('type');
  const [activeType, setActiveType] = useState(typeParams || '');

  const handleFilterClick = (value: string) => {
    setActiveType((prevActiveType) => (prevActiveType === value ? '' : value));
    const url =
      value === activeType
        ? removeQueryFromUrl({
            params: searchParams.toString(),
            keysToRemove: ['type'],
          })
        : formUrlQuery({
            params: searchParams.toString(),
            key: 'type',
            value,
          });

    router.push(url, { scroll: false });
  };

  return (
    <div className=' flex w-full items-center gap-2 rounded-xl  px-5  py-3  shadow-sm '>
      <p>Type:</p>{' '}
      {GlobalSearchFilters.map(({ name, value }) => (
        <Button
          onClick={() => handleFilterClick(value)}
          className={`rounded-xl bg-light-700 p-2  px-4 font-semibold transition-all  duration-200 hover:text-light-900  ${
            activeType === value
              ? 'primary-gradient text-white'
              : 'bg-light-700 hover:text-primary-500 dark:bg-dark-300'
          } `}
          key={value}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default GlobalFilters;
