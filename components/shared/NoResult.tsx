import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className='text-dark200_light900 m-auto mt-6 flex w-full max-w-[351px] flex-col items-center justify-center gap-6 bg-transparent md:mt-11'>
      <Image
        src='/assets/images/light-illustration.png'
        alt='no question image'
        width={200}
        height={200}
        className='mx-auto object-contain dark:hidden'
      />
      <Image
        src='/assets/images/dark-illustration.png'
        alt='no question image'
        width={200}
        height={200}
        className='mx-auto hidden object-contain dark:block'
      />
      <h2 className='h2-bold text-center'>{title}</h2>
      <p className='body-regular text-dark500_light700 text-center'>
        {description}
      </p>
      <Link href={link}>
        <Button className='primary-gradient paragraph-medium w-[173px] rounded-[10px] border-none px-2 py-3 text-light-900 outline-none'>
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
