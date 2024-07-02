import React from 'react';
import BadgeBox from './BadgeBox';
import { formatNumber } from '@/lib/utils';

interface Props {
  askedQuestions: number;
  answers: number;
  badgeCounts: {
    GOLD: number;
    SILVER: number;
    BRONZE: number;
  };
  reputation?: number;
}

const Stats = ({ askedQuestions, answers, badgeCounts, reputation }: Props) => {
  return (
    <>
      <h4 className='h3-semibold mb-5 mt-10'>Stats - {reputation}</h4>
      <div className=' grid gap-4 xs:grid-cols-2 xl:grid-cols-4'>
        <div className='flex w-full items-center justify-evenly gap-4  bg-light-900 px-3 py-4 font-semibold text-dark-200 shadow-light-100 dark:border-dark-300 dark:bg-dark-200 dark:text-light-800 dark:shadow-dark-200 lg:flex-row  xl:flex-col 2xl:flex-row'>
          <div className='h-[40px] w-[68px]'>
            <p>{formatNumber(askedQuestions)}</p>
            <span className=' text-dark-500 dark:text-light-700'>
              Questions
            </span>
          </div>
          <div className='h-[40px] w-[68px] '>
            <p>{formatNumber(answers)}</p>
            <span className=' text-dark-500 dark:text-light-700'>Answers</span>
          </div>
        </div>
        <BadgeBox
          imgSrc='/assets/icons/gold-medal.svg'
          title='Gold Badges'
          value={badgeCounts.GOLD || 0}
          alt='Gold badge icon'
        />
        <BadgeBox
          imgSrc='/assets/icons/silver-medal.svg'
          title='Silver Badges'
          value={badgeCounts.SILVER || 0}
          alt='Gold badge icon'
        />
        <BadgeBox
          imgSrc='/assets/icons/bronze-medal.svg'
          title='Bronze Badges'
          value={badgeCounts.BRONZE || 0}
          alt='Gold badge icon'
        />
      </div>
    </>
  );
};

export default Stats;
