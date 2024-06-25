'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  otherClasses?: string;
  placeholder: string;
}

const LocalSearchBar = ({
  placeholder,
  iconPosition,
  imgSrc,
  otherClasses,
  route,
}: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient relative flex grow items-center  gap-2.5 rounded-[10px] border p-2 px-4  dark:border-none md:p-3 ${otherClasses}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          width={21}
          height={21}
          alt='search icon'
          className='text-light-400'
        />
      )}
      <Input
        type='text'
        placeholder={placeholder}
        // onChange={() => {}}
        // value=''
        className='paragraph-regular text-dark400_light800 placeholder:text-dark400_light700 background-light800_darkgradient border-none  shadow-none  outline-none  '
      />
      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          width={21}
          height={21}
          alt='search icon'
          className='text-light-400'
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
