import Filter from '@/components/shared/Filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { JobsFilterOptions } from '@/constants/filters';
import { SearchParamsProps } from '@/types';
import React from 'react';
import JobCard from '@/components/cards/JobCard';
import NoResult from '@/components/shared/NoResult';
import PaginationComponent from '@/components/shared/PaginationComponent';
import { getJobs } from '@/lib/actions/jobs.action';

const Page = async ({ searchParams }: SearchParamsProps) => {
  const jobs = await getJobs({
    page: Number(searchParams?.page || 1),
    query: searchParams?.query,
  });

  return (
    <>
      <h1 className='h2-bold text-dark100_light900 text-center font-bold sm:text-left'>
        Jobs
      </h1>
      <div className='mt-11 flex flex-col justify-between gap-5  md:flex-row '>
        <LocalSearchBar
          iconPosition='left'
          route='/'
          otherClasses='flex-1'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for Questions here...'
        />{' '}
        <Filter
          filters={JobsFilterOptions}
          otherClasses='md:min-h-[56px] min-w-[170px]'
          containerClasses='flex'
        />
      </div>
      <div className='mt-8 flex flex-col gap-5'>
        {jobs?.length > 0 ? (
          jobs.map((job: any) => (
            <JobCard
              key={job.job_title}
              job_title={job.job_title}
              job_apply_link={job.job_apply_link}
              job_description={job.job_description}
              job_city={job.job_city}
              job_country={job.job_country}
              employer_logo={job.employer_logo}
              job_state={job.job_state}
            />
          ))
        ) : (
          <NoResult
            title='There’s no jobs to show'
            description='Search with other requirments! 💡'
            link='/'
            linkTitle='Home'
          />
        )}
      </div>
      <PaginationComponent
        currentPage={Number(searchParams?.page || 1)}
        totalPages={10}
      />
    </>
  );
};

export default Page;
