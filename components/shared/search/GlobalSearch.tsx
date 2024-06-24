import Image from 'next/image';
import React from 'react';
import { Input } from '@/components/ui/input';

const GlobalSearch = () => {
  return (
    <div className='relative w-full max-w-[600px] max-lg:hidden'>
      <div className='background-light800_darkgradient relative flex min-h-[56px] grow items-center rounded-xl px-4'>
        <Image
          src='/assets/icons/search.svg'
          alt='search'
          width={24}
          height={24}
          className='cursor-pointer'
        />
        <Input
          className='paragraph-regular no-focus text-dark400_light700 background-light800_darkgradient border-none shadow-none  outline-none'
          type='text'
          placeholder='Search globally'
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
