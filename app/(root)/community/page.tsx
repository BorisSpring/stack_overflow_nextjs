import UserCard from '@/components/cards/UserCard';
import Filter from '@/components/shared/Filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { UserFilters } from '@/constants/filters';
import { getAllUsers } from '@/lib/actions/user.action';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  const result = await getAllUsers({});

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
      <section className='mt-10 flex flex-wrap justify-between gap-4'>
        {result !== undefined && result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className='paragraph-regular text-dark200_light800 mx-auto  max-w-4xl text-center'>
            <p> No users yet</p>
            <Link href='/sign-up' className='mt-1 font-bold text-accent-blue'>
              Join to be the frist!
            </Link>
          </div>
        )}
        {/* NoResult = ({ title, description, link, linkTitle }: Props) => { */}
        {/* {Array.from({ length: 20 }).map((_, i) => (
          <UserCard
            tags={[
              { name: 'a', _id: '1' },
              { name: 'b', _id: '3' },
              { name: 'c', _id: '2' },
            ]}
            key={i}
            _id={'1'}
            picture='https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yaVF4a25DNkFIekFRdVR4UExPMnpHaWFKTjkifQ'
            name='boris dimitriejvic'
            username='username bla '
          />
        ))} */}
      </section>
    </>
  );
};

export default page;
