'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';
import GlobalFilters from './GlobalFilters';
import { globalSearch } from '@/lib/actions/general.action';

interface Props {
  isOpenGlobalSearch: boolean;
  setIsOpenGlobalSearch: (isOpen: boolean) => void;
  setSearch: (search: string) => void;
}

const GlobalResults = ({
  isOpenGlobalSearch,
  setIsOpenGlobalSearch,
  setSearch,
}: Props) => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const global = searchParams.get('global');

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(() => true);
      setResults(() => []);
      try {
        const results = await globalSearch({
          searchQuery: global || '',
          type: searchParams?.get('type'),
        });
        setResults(() => JSON.parse(results));
      } catch (error) {
      } finally {
        setIsLoading(() => false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, searchParams]);

  const renderLink = (type: string, id: string) => {
    let link;
    switch (type) {
      case 'question' || 'answer':
        link = `/question/${id}`;
        break;
      case 'user':
        link = `/profile/${id}`;
        break;
      case 'tag':
        link = `/tags/${id}`;
        break;
      default:
        break;
    }

    return link;
  };

  if (!isOpenGlobalSearch) return undefined;
  return (
    <div className='absolute top-16 my-5  w-full rounded-xl bg-light-800 text-dark-300 dark:bg-dark-300 dark:text-light-800 '>
      <GlobalFilters />
      <div className='h-px w-full bg-light-700 dark:bg-dark-400' />

      <div className='space-y-5'>
        <p className='pl-5 pt-4 font-semibold text-dark-200 dark:text-light-800'>
          Top Match
        </p>
        {isLoading ? (
          <div className='flex-center flex-col px-5'>
            <ReloadIcon className='my-2 size-8 animate-spin text-primary-500' />
            <p className='body-regular text-dark200_light800'>
              Browsing whole database
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            {results?.length > 0 ? (
              results.map((item: any, index: number) => (
                <Link
                  onClick={() => {
                    setIsOpenGlobalSearch(false);
                    setSearch('');
                  }}
                  key={item.type + item.id + index}
                  href={renderLink(item.type, item._id) || ''}
                  className='flex w-full items-center gap-2 px-5 py-2 hover:bg-light-700/50 dark:hover:bg-dark-400/50'
                >
                  <Image
                    src='/assets/icons/tag.svg'
                    width={18}
                    height={18}
                    alt='tag icon'
                    className='invert-colors mt-1 object-contain'
                  />
                  <div className='flex flex-col'>
                    <p className='line-clamp-1 text-dark-300 dark:text-light-700'>
                      {item.title}
                    </p>
                    <p className='capitalize text-light-400 dark:text-light-500'>
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className='flex-center flex-col px-5 py-2'>
                <p className='text-dark200_light800 body-regular px-5 py-2.5'>
                  Ops, no results found!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResults;
