import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';

interface Props {
  tag: {
    _id: string;
    name: string;
    count: number;
    questions: string[];
    description?: string;
  };
}

const TagCard = ({ tag }: Props) => {
  return (
    <Link href={`/tags/${tag._id}`} className='shadow-light100_darknone'>
      <article className='background-light900_dark200 light-border flex w-full flex-col gap-4 rounded-xl px-[30px]  py-[40px] sm:w-[260px] '>
        <Badge className=' background-light800_dark300 text-dark500_light700 subtle-medium w-fit rounded-[8px] border-none px-4 py-2 uppercase text-light-400 dark:text-light-500 '>
          {tag.name}
        </Badge>
        <p className='small-regular text-dark300_light700'>
          JavaScript, often abbreviated as JS, is a programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS
        </p>
        <p className='body-semibold text-primary-500'>
          {tag.questions?.length} +
          <span className='text-dark400_light500 small-medium ml-2'>
            Questions
          </span>
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
