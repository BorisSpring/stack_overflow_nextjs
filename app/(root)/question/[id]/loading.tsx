import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const loading = () => {
  return (
    <div className='flex flex-col gap-5'>
      <Skeleton className='min-h-[56px] w-full rounded-xl' />
      <Skeleton className='min-h-[400px] w-full rounded-xl' />
      <div className='flex flex-wrap gap-2 '>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton className='h-10 w-[50px] rounded-lg' key={i} />
        ))}
      </div>
      <Skeleton className='w-full md:ml-auto md:max-w-[173px]' />
      <div className='flex flex-col gap-5'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton className='h-[110px] w-[50px] rounded-lg' key={i} />
        ))}
      </div>
      <Skeleton className='h-[300px] w-[50px] rounded-lg' />
    </div>
  );
};

export default loading;
