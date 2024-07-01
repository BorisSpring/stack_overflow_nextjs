'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

import GlobalResults from '../GlobalResults';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeQueryFromUrl } from '@/lib/utils';

const GlobalSearch = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const globalSearchParam = searchParams.get('global');

  const containerRef = useRef(null);

  const [isOpenGlobalSearch, setIsOpenGlobalSearch] = useState(false);
  const [search, setSearch] = useState(globalSearchParam || '');

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        containerRef.current &&
        // @ts-ignore
        !containerRef.current.contains(event.target)
      ) {
        event.stopPropagation();
        setSearch('');
        setIsOpenGlobalSearch(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const url =
        search?.trim()?.length > 0
          ? formUrlQuery({
              params: searchParams.toString(),
              key: 'global',
              value: search,
            })
          : removeQueryFromUrl({
              params: searchParams.toString(),
              keysToRemove: ['global'],
            });
      router.push(url, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [pathName, search, searchParams, router]);

  return (
    <div
      className='relative w-full max-w-[600px] max-lg:hidden'
      ref={containerRef}
    >
      <div className='background-light800_darkgradient relative flex min-h-[56px] grow items-center rounded-xl px-4'>
        <Image
          src='/assets/icons/search.svg'
          alt='search'
          width={24}
          height={24}
          className='cursor-pointer'
        />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(() => e.target.value);
            if (e.target.value.trim().length > 0) {
              !isOpenGlobalSearch && setIsOpenGlobalSearch(true);
            } else {
              setIsOpenGlobalSearch(false);
            }
          }}
          className='paragraph-regular no-focus text-dark400_light700 background-light800_darkgradient border-none shadow-none  outline-none'
          type='text'
          placeholder='Search globally'
        />
      </div>
      <GlobalResults
        setSearch={setSearch}
        setIsOpenGlobalSearch={setIsOpenGlobalSearch}
        isOpenGlobalSearch={isOpenGlobalSearch}
      />
    </div>
  );
};

export default GlobalSearch;
