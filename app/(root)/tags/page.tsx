import TagCard from '@/components/cards/TagCard';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { TagFilters } from '@/constants/filters';
import { getAllTags } from '@/lib/actions/tag.action';
import React from 'react';

const page = async () => {
  const results = await getAllTags({});
  return (
    <>
      <h1 className='h1-bold  text-dark100_light900'>All Users</h1>
      <div className='mt-10 flex w-full flex-col items-center gap-5 md:flex-row md:gap-2.5'>
        <LocalSearchBar
          iconPosition='left'
          route='/tags'
          otherClasses='flex-1'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for tag here...'
        />{' '}
        <Filter
          filters={TagFilters}
          containerClasses='min-h-[56px] w-full  md:max-w-[207px] md:min-w-[207px]'
          otherClasses='md:h-[56px] body-semibold'
        />
      </div>
      <section className=' mt-10 flex flex-wrap gap-4'>
        {results?.tags?.length > 0 ? (
          results.tags.map((tag) => <TagCard tag={tag} key={tag._id} />)
        ) : (
          <NoResult
            title='No tags Found'
            description='It looks like there are no tags found!'
            link='/ask-a-question'
            linkTitle='Ask A Question'
          />
        )}
      </section>
    </>
  );
};

export default page;
