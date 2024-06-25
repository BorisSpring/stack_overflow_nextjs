import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RedenerTag from './RedenerTag';

const questions = [
  {
    _id: '1',
    question:
      'Would it be appropriate to point out an error in another paper during a referee report?',
  },
  { _id: '2', question: 'How can an airconditioning machine exist?' },
  {
    _id: '3',
    question: 'Interrogated every time crossing UK Border as citizen',
  },
  { _id: '4', question: 'Low digit addition generator' },
  {
    _id: '5',
    question: 'What is an example of 3 numbers that do not make up a vector?',
  },
];

const tags = [
  { _id: '1', name: 'javascript', totalQuestions: 2222 },
  { _id: '2', name: 'next', totalQuestions: 2222 },
  { _id: '3', name: 'react', totalQuestions: 2222 },
  { _id: '4', name: 'phyton', totalQuestions: 2222 },
  { _id: '5', name: 'javascript', totalQuestions: 2222 },
  { _id: '6', name: 'postgresql', totalQuestions: 2222 },
  { _id: '7', name: 'machine learning', totalQuestions: 2222 },
];

const RightSideBar = () => {
  return (
    <section className='background-light900_dark200 custom-scrollbar sticky right-0 top-0 h-screen w-[330px] overflow-y-auto border-r border-l-[#101012] px-[26px] pt-28 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <h3 className='h3-bold text-dark200_light900 pt-16'>Hot Network</h3>
      {/* questions */}
      <div className=' mt-5 flex flex-col gap-8'>
        {questions.map(({ _id, question }, i) => (
          <Link
            href={`/quetsions/${_id}`}
            key={i}
            className='flex items-start justify-between'
          >
            <p className='body-medium text-dark500_light700  w-[248px] font-inter font-medium  '>
              {question}
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
        {tags.map((tag, i) => (
          <RedenerTag key={i} {...tag} showCount={true} />
        ))}
      </div>
    </section>
  );
};

export default RightSideBar;
