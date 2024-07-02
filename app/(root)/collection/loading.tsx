import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const loading = () => {
  return (
    <section>
      <h2 className='h2-bold text-dark100_light900 text-center font-bold sm:text-left'>
        Saved Questions
      </h2>
      <div className='mt-10 flex flex-col items-center gap-5 md:flex-row md:gap-2.5'>
        <Skeleton className='min-h-[56px] w-full' />
        <Skeleton className='min-h-[56px] w-full min-w-[173px]' />
      </div>
      <div className='mt-10 flex flex-col gap-6'>
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className=' h-48 w-full rounded-xl' />
        ))}
      </div>
    </section>
  );
};

export default loading;
