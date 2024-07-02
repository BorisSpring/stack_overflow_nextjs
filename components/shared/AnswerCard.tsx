import Link from 'next/link';
import React from 'react';
import Metric from './Metric';
import { formatNumber, getTimeStamp } from '@/lib/utils';
import EditDeleteAction from './EditDeleteAction';

interface Props {
  questionTitle: string;
  author: {
    _id: string;
    picture: string;
    name: string;
    clerkId: string;
  };
  answerId: string;
  questionCreatedAt: Date;
  upvotes: number;
  createdAt: Date;
  questionId: string;
  loggedUserClerkId: string | null | undefined;
}
const AnswerCard = ({
  questionTitle,
  author,
  upvotes,
  createdAt,
  questionId,
  questionCreatedAt,
  loggedUserClerkId,
  answerId,
}: Props) => {
  const showAction = loggedUserClerkId && loggedUserClerkId === author.clerkId;
  return (
    <Link
      href={`/question/${questionId}`}
      className='flex flex-col gap-3 rounded-[10px] bg-light-900 p-3 shadow-light-100 dark:bg-dark-200 dark:shadow-none lg:p-5'
    >
      <div className='flex flex-col-reverse justify-between gap-5 lg:flex-row'>
        <div>
          <span className='subtle-regular text-dark-500 dark:text-light-500 '>
            {getTimeStamp(questionCreatedAt)}
          </span>
          <h3 className='base-semibold sm:h3-semibold text-dark200_light800 line-clamp-1 flex-1'>
            {questionTitle}
          </h3>
        </div>
        {showAction && (
          <EditDeleteAction
            itemId={JSON.parse(answerId)}
            type='answer'
            loggedUserClerkId={loggedUserClerkId}
          />
        )}
      </div>
      <div className='flex flex-col items-start gap-3 lg:flex-row lg:justify-between'>
        <Metric
          imageUrl={author.picture}
          alt='user avatar'
          value={author.name}
          title={` •  answered ${getTimeStamp(createdAt)}`}
          textStyles='paragraph-medium text-dark-200 dark:text-light-700'
          isAuthor
        />
        <Metric
          imageUrl='/assets/icons/like.svg'
          alt='vote icon'
          value={formatNumber(upvotes)}
          title={` votes`}
          textStyles='text-sm text-dark-200 dark:text-light-700'
        />
      </div>
    </Link>
  );
};

export default AnswerCard;
