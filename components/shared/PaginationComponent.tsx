'use client';
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

const PaginationComponent = ({ currentPage, totalPages }: PaginationProps) => {
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
    )
      return;

    const value = direction === 'next' ? currentPage + 1 : currentPage - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: String(value),
    });
    router.push(newUrl, { scroll: false });
  };

  const pages = generatePagination(4, 20);
  return (
    <div className='mt-8 flex w-full items-center justify-center gap-2'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button onClick={() => handlePrevNext('prev')}>
              <PaginationPrevious />
            </Button>
          </PaginationItem>
          {pages.map((page, index) => (
            <PaginationItem key={index}>
              {page === -1 ? (
                <PaginationEllipsis />
              ) : (
                <Button onClick={() => handleNavigation(page)}>{page}</Button>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button onClick={() => handlePrevNext('next')}>
              <PaginationNext />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
