'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeQueryFromUrl } from '@/lib/utils';

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
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [search, setsearch] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl;
      if (search) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: search,
        });
      } else {
        newUrl = removeQueryFromUrl({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathName, searchParams, router, query]);

  return (
    <div
      className={`background-light800_darkgradient relative flex w-full grow items-center gap-2.5  rounded-[10px] border  px-4  dark:border-none md:p-2 ${otherClasses}`}
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
        onChange={(e) => {
          setsearch(() => e.target.value);
        }}
        value={search}
        className='paragraph-regular text-dark400_light800 placeholder:text-dark400_light700 background-light800_darkgradient rounded-[10px] border-none  shadow-none  outline-none  '
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
