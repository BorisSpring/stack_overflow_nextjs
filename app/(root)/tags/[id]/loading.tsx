import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const loading = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h1>Tag</h1>
      <Skeleton className='min-h-[56px] w-full' />
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className=' h-48 w-full rounded-xl' />
      ))}
    </div>
  );
};

export default loading;
