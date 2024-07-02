import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const formInputsSkeletonInformations = [
  { label: 'Full Name', description: 'This is your public display name.' },
  { label: 'Username', description: 'This is your public display username..' },
  {
    label: 'Portfolio website link',
    description: 'Link that will guide user to your portfolio website',
  },
  {
    label: 'Location',
    description: 'Write where are you currently located at',
  },
  { label: 'Bio', description: 'Write your details about bio' },
];

const loading = () => {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='h1-bold mb-5 text-dark-100 dark:text-light-900'>
        Edit Profile
      </h1>
      {formInputsSkeletonInformations.map(({ label, description }) => (
        <div className='flex flex-col gap-1' key={label}>
          <p className='paragraph-semibold text-dark-400 dark:text-light-800'>
            {label}
          </p>
          <Skeleton className='min-h-[56px] w-full rounded-[10px]' />
          <p className='text-sm font-medium text-dark-500 dark:text-light-400'>
            {description}
          </p>
        </div>
      ))}
      <div className='flex w-full'>
        <Skeleton className='mt-2 min-h-[40px] w-full md:ml-auto md:w-[175px]' />
      </div>
    </div>
  );
};

export default loading;
