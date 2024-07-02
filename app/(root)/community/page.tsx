import UserCard from '@/components/cards/UserCard';
import Filter from '@/components/shared/Filter';
import PaginationComponent from '@/components/shared/PaginationComponent';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { UserFilters } from '@/constants/filters';
import { getAllUsers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Devflow User Informations',
  description: 'Search up for other user that are using devflow app',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
};

const page = async ({ searchParams }: SearchParamsProps) => {
  const { users, totalPages } = await getAllUsers({
    searchQuery: searchParams.query,
    filter: searchParams.filter,
    page: Number(searchParams.page) || 1,
  });

  return (
    <>
      <h1 className='h1-bold  text-dark100_light900'>All Users</h1>
      <div className='mt-10 flex flex-col items-center gap-5 md:flex-row md:gap-2.5'>
        <LocalSearchBar
          iconPosition='left'
          route='/community'
          otherClasses='flex-1'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for tag here...'
        />{' '}
        <Filter
          filters={UserFilters}
          containerClasses=' w-full  md:max-w-[207px] md:min-w-[207px]'
          otherClasses='md:h-[56px] body-semibold'
        />
      </div>
      <section className='mt-10 flex flex-wrap justify-start gap-4'>
        {users.length > 0 ? (
          users.map((user: any) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className='paragraph-regular text-dark200_light800 mx-auto  max-w-4xl text-center'>
            <p> No users yet</p>
            <Link href='/sign-up' className='mt-1 font-bold text-accent-blue'>
              Join to be the frist!
            </Link>
          </div>
        )}
      </section>
      <PaginationComponent
        currentPage={Number(searchParams.page) || 1}
        totalPages={totalPages}
      />
    </>
  );
};

export default page;
