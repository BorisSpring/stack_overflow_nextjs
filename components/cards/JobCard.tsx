/* eslint-disable camelcase */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  job_title?: string;
  job_apply_link?: string;
  job_description?: string;
  job_city?: string;
  job_country?: string;
  employer_logo?: string;
  job_state?: string;
}

const JobCard = ({
  job_title,
  job_apply_link,
  job_description,
  job_city,
  job_country,
  employer_logo,
  job_state,
}: Props) => {
  return (
    <div className='flex flex-col gap-3 rounded-[8px] bg-light-800 p-5 shadow-light-100 dark:bg-dark-300 dark:shadow-none sm:flex-row sm:gap-5'>
      <p className='ml-auto w-fit whitespace-nowrap rounded-[8px] bg-light-700 px-2 py-0.5  text-sm dark:bg-dark-500 dark:text-light-700 sm:hidden'>
        {job_country} {job_state} {job_city}
      </p>
      <Image
        src={employer_logo || '/assets/images/site-logo.svg'}
        width={60}
        height={60}
        className='mt-2 rounded-full object-contain sm:self-start'
        alt='logo'
      />
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <h3 className='base-semibold text-dark-100 dark:text-light-800'>
            {job_title}
          </h3>
          <p className='hidden rounded-[8px] bg-light-700 px-2 py-0.5 text-sm  dark:bg-dark-500 dark:text-light-700 sm:block '>
            Pittsburh, PA , US
          </p>
        </div>
        <p className='body-regular line-clamp-3 text-dark-300  dark:text-light-800 sm:line-clamp-2'>
          {job_description}
        </p>
        <div className='flex flex-col gap-2 sm:flex-row sm:justify-between'>
          <div className='flex flex-col gap-2 sm:flex-row'>
            <div className='flex items-center gap-2 text-light-500 dark:text-light-500'>
              <Image
                width={18}
                height={18}
                alt='clock icon'
                src='/assets/icons/clock.svg'
              />
              <p>FULLTIME</p>
            </div>
            <div className='flex items-center gap-2 text-light-500 dark:text-light-500'>
              <Image
                width={18}
                height={18}
                alt='clock icon'
                className='invert-colors'
                src='/assets/icons/currency-dollar-circle.svg'
              />
              <p>Not disclosed</p>
            </div>
          </div>
          {job_apply_link && (
            <Link
              href={job_apply_link}
              target='_parent'
              className='primary-text-gradient flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:underline'
            >
              View job{' '}
              <Image
                src='/assets/icons/arrow-up-right.svg'
                width={20}
                alt='up right icon'
                height={20}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
