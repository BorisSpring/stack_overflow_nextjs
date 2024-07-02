import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const loading = () => {
  return (
    <section>
      <h1 className='h1-bold  text-dark100_light900'>All Tags</h1>
      <div className='mt-10 flex flex-col items-center gap-5 md:flex-row md:gap-2.5'>
        <Skeleton className='min-h-[56px] w-full' />

        <Skeleton className='min-h-[56px] w-full min-w-[173px]' />
      </div>
      <section className='mt-10 flex flex-wrap justify-start gap-4'>
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} className='m-auto h-48 w-full sm:max-w-[200px]' />
        ))}
      </section>
      <Skeleton className='m-auto my-10 h-10 w-[200px]' />
    </section>
  );
};

export default loading;
