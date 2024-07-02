import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const formInputsSkeletonInformations = [
  {
    label: 'Question Title',
    description:
      'Be specific and imagine you  re asking question to another person.',
  },
  { label: 'Username', description: 'This is your public display username..' },
  {
    label: 'Detailed explanation of your problem?*',
    description:
      'Introduce the problem and expand on what you put in the title. Minimum 20 characters.',
  },
  {
    label: 'Tags *',
    description:
      'Add up to 15 tags to describe what your question is about. Start typing to see suggestions.You need to press enter to add tag.',
  },
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
          <Skeleton
            className={` w-full rounded-[10px] ${
              label === 'Detailed explanation of your problem?*'
                ? 'min-h-[400px]'
                : 'min-h-[56px]'
            }`}
          />
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
