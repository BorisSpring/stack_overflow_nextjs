import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RedenerTag from './RedenerTag';
import { hotQuestions } from '@/lib/actions/question.action';
import { getHotTags } from '@/lib/actions/tag.action';

const RightSideBar = async () => {
  const [questionHot, tagsHot] = await Promise.all([
    hotQuestions(),
    getHotTags(),
  ]);

  return (
    <section className='background-light900_dark200 custom-scrollbar sticky right-0 top-0 h-screen w-[330px] overflow-y-auto border-r border-l-[#101012] px-[26px] pt-28 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <h3 className='h3-bold text-dark200_light900 pt-16'>Hot Network</h3>
      {/* questions */}
      <div className=' mt-5 flex flex-col gap-8'>
        {questionHot?.map(({ _id, title }: any) => (
          <Link
            href={`/quetsion/${_id}`}
            key={_id}
            className='flex items-start justify-between'
          >
            <p className='body-medium text-dark500_light700  w-[248px] font-inter font-medium  '>
              {title}
            </p>
            <Image
              src='/assets/icons/chevron-right.svg'
              width={20}
              height={20}
              className='invert-colors'
              alt='chevron right'
            />
          </Link>
        ))}
      </div>
      <h3 className='h3-bold text-dark200_light900 pt-16'>Popular Tags</h3>
      {/* tags */}
      <div className='mt-5 flex flex-col gap-3'>
        {tagsHot?.map(({ _id, name, numberOfQuestions }: any) => (
          <RedenerTag
            key={_id}
            _id={_id}
            name={name}
            totalQuestions={numberOfQuestions}
            showCount
          />
        ))}
      </div>
    </section>
  );
};

export default RightSideBar;
