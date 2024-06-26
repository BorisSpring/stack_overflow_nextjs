import React from 'react';

import RedenerTag from '../shared/RedenerTag';
import Link from 'next/link';
import Metric from '../shared/Metric';
import { formatNumber, getTimeStamp } from '@/lib/utils';

interface QuestionProps {
  _id: string;
  title: string;
  tags?: { _id: string; name: string }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  views: number;
  answers: Array<object>;
  upvotes: number;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  createdAt,
  views,
  answers,
  upvotes,
}: QuestionProps) => {
  return (
    <div className='card-wrapper flex flex-col gap-5 rounded-[10px] p-9 sm:px-11'>
      <div className='flex  flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
        <div>
          <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-2 hover:line-clamp-none'>
              {title}
            </h3>
          </Link>
        </div>
        {/* {add edit delete later} */}
      </div>
      {/* tags */}
      <div className='flex flex-wrap gap-3'>
        {tags?.map((tag) => (
          <RedenerTag
            name={tag.name}
            _id={tag._id}
            key={tag._id}
            showCount={false}
          />
        ))}
      </div>

      {/* question details */}
      <div className='flex-between mt-6 w-full flex-wrap gap-3'>
        <Metric
          imageUrl='/assets/icons/avatar.svg'
          alt='Upvotes'
          value={author.name}
          title={` - asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles='body-medium text-dark400_light700'
        />
        <Metric
          imageUrl='/assets/icons/like.svg'
          alt='Upvotes'
          value={formatNumber(upvotes)}
          title=' Votes'
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imageUrl='/assets/icons/message.svg'
          alt='messages'
          value={formatNumber(answers?.length ?? 0)}
          title=' Answers'
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imageUrl='/assets/icons/eye.svg'
          alt='eye'
          value={formatNumber(views)}
          title=' Views'
          textStyles='small-medium text-dark400_light800'
        />
      </div>
    </div>
  );
};

export default QuestionCard;