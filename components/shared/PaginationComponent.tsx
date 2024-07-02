'use client';
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const generatePagination = (
  currentPage: number,
  totalPages: number
): number[] => {
  const delta = 2;
  const startPage = Math.max(1, currentPage - delta);
  const endPage = Math.min(totalPages, currentPage + delta);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );
};

const PaginationComponent = ({
  currentPage = 1,
  totalPages,
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNavigation = (direction: number) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: String(direction),
    });
    router.push(newUrl, { scroll: false });
  };

  const handlePrevNext = (direction: string) => {
    if (
      (direction === 'next' && currentPage >= totalPages) ||
      (direction === 'prev' && currentPage <= 1)
    ) {
      return;
    }
    const value = direction === 'next' ? currentPage + 1 : currentPage - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: String(value),
    });
    router.push(newUrl, { scroll: false });
  };

  const pages = generatePagination(currentPage, totalPages);

  if (totalPages <= 1) return undefined;
  return (
    <div className='mt-8 flex w-full items-center justify-center '>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={currentPage <= 1 && currentPage < totalPages}
              className={`text-dark-200 dark:text-light-800 ${
                currentPage < 1 &&
                currentPage < totalPages &&
                'cursor-not-allowed'
              }`}
              onClick={() => handlePrevNext('prev')}
            >
              <PaginationPrevious />
            </Button>
          </PaginationItem>
          {pages.map((page, index) => (
            <PaginationItem key={index}>
              <Button
                className={`size-6 p-1 px-2 font-semibold  ${
                  currentPage === page
                    ? 'rounded-full bg-primary-500 text-light-900 '
                    : 'text-dark-200 dark:text-light-700'
                }`}
                onClick={() => handleNavigation(page)}
              >
                {page}
              </Button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              disabled={currentPage >= totalPages}
              className='p-0 '
              onClick={() => handlePrevNext('next')}
            >
              <PaginationNext className='text-dark-200 dark:text-light-800' />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
