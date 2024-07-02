import Image from 'next/image';
import React from 'react';

interface Props {
  imgSrc: string;
  value: number;
  title: string;
  alt: string;
}

const BadgeBox = ({ imgSrc, value, title, alt }: Props) => {
  return (
    <div
      className='flex min-h-[90px] w-full gap-4 bg-light-900 px-3 py-4
     font-semibold text-dark-200 shadow-light-100 dark:border-dark-300  dark:bg-dark-200 dark:text-light-800  dark:shadow-dark-200 sm:flex-col 2xl:flex-row  2xl:items-center'
    >
      <Image src={imgSrc} width={36.25} height={50} alt={alt} />
      {/* answer box */}
      <div className='h-[40px] w-[68px] whitespace-nowrap '>
        <p>{value}</p>
        <span className=' text-dark-500 dark:text-light-700'>{title}</span>
      </div>
    </div>
  );
};

export default BadgeBox;
