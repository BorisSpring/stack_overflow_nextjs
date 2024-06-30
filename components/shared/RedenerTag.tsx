import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RedenerTag = ({ _id, totalQuestions, name, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className='flex items-center justify-between'>
      <Badge className=' background-light800_dark300 text-dark500_light700 subtle-medium w-fit rounded-[8px] border-none px-4 py-2 uppercase text-dark-300 dark:text-light-700 '>
        {name}
      </Badge>

      {showCount && (
        <p className='text-dark500_light700 small-medium'>{totalQuestions}+</p>
      )}
    </Link>
  );
};

export default RedenerTag;
