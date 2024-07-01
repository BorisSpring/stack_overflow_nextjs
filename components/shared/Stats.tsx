import React from 'react';
import BadgeBox from './BadgeBox';
import { formatNumber } from '@/lib/utils';

interface Props {
  askedQuestions: number;
  answers: number;
  gold?: number;
  bronze?: number;
  silver?: number;
}

const Stats = ({ askedQuestions, answers, gold, bronze, silver }: Props) => {
  return (
    <>
      <h4 className='h3-semibold mb-5 mt-10'>Stats</h4>
      <div className=' grid gap-4 xs:grid-cols-2 xl:grid-cols-4'>
        <div className='flex w-full items-center justify-evenly gap-4 bg-light-900 px-3 py-4 font-semibold text-dark-200 shadow-light-100 dark:border-dark-300 dark:bg-dark-200 dark:text-light-800 dark:shadow-dark-200 lg:flex-row  xl:flex-col 2xl:flex-row'>
          <div className='h-[40px] w-[68px] '>
            <p>{formatNumber(askedQuestions)}</p>
            <span className=' text-dark-500 dark:text-light-700'>
              Questions
            </span>
          </div>
          <div className='h-[40px] w-[68px] '>
            answers{' '}
            <span className=' text-dark-500 dark:text-light-700'>Answers</span>
          </div>
        </div>
        <BadgeBox
          imgSrc='/assets/icons/gold-medal.svg'
          title='Gold Badges'
          value={15}
          alt='Gold badge icon'
        />
        <BadgeBox
          imgSrc='/assets/icons/silver-medal.svg'
          title='Gold Badges'
          value={13}
          alt='Gold badge icon'
        />
        <BadgeBox
          imgSrc='/assets/icons/bronze-medal.svg'
          title='Gold Badges'
          value={17}
          alt='Gold badge icon'
        />
      </div>
    </>
  );
};

export default Stats;