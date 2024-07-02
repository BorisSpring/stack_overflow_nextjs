import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const loading = () => {
  return (
    <div className='flex flex-col gap-10'>
      <h4 className='h3-semibold mb-5 mt-10'>Stats</h4>
      <div className='flex w-full flex-col justify-between gap-5 md:flex-row'>
        <Skeleton className='h-[120px] w-full rounded-xl md:max-w-[400px]  ' />
        <Skeleton className='h-[56px] w-full rounded-xl md:max-w-[175px]' />
      </div>
      <div className=' grid gap-4 xs:grid-cols-2 xl:grid-cols-4'>
        <Skeleton className='flex w-full gap-4  rounded-xl  px-3 py-4' />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='flex min-h-[90px] w-full rounded-xl' />
        ))}
      </div>
      <Skeleton className='my-5 h-10 w-[150px] rounded-xl' />
      <div className='flex flex-col gap-6'>
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className=' h-48 w-full rounded-xl' />
        ))}
      </div>
    </div>
  );
};

export default loading;
