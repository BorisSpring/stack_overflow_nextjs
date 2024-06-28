import { QuestionFilters } from '@/constants/filters';
import React from 'react';
import Filter from '@/components/shared/Filter';
import { format } from 'date-fns';
import Image from 'next/image';
import ParseHTML from './ParseHTML';
import Link from 'next/link';
import Votes from './Votes';

interface Props {
  questionId: string;
  userId?: string;
  filter?: string;
  page?: number;
  answers: [
    {
      _id: string;
      question: string;
      upvotes: string[];
      downvotes: string[];
      content: string;
      createdAt: Date;
      author: {
        _id: string;
        picture: string;
        clerkId: string;
        name: string;
      };
    }
  ];
}
const AllAnswers = ({ questionId, filter, page, answers, userId }: Props) => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <p className='primary-text-gradient text-[16px] font-medium'>
          {answers.length} Answers
        </p>
        <Filter containerClasses='min-w-[173px]' filters={QuestionFilters} />
      </div>
      <div className='flex flex-col gap-4'>
        {answers.map((answer) => (
          <div
            key={answer._id}
            className=' rounded-[10px] p-3 dark:bg-dark-300'
          >
            <div className='flex flex-col items-start gap-2 md:flex-row md:justify-between'>
              {/* info about user that post answer */}
              <Link
                href={`/profile/${answer.author._id}`}
                className='flex items-center gap-1'
              >
                <Image
                  alt='user avatar'
                  src={answer.author.picture}
                  width={22}
                  height={22}
                  className='rounded-full'
                />
                <p className='body-semibold text-sm text-dark-300  dark:text-light-900'>
                  {answer.author.name}{' '}
                  <span className='text-dark-500 dark:text-light-500'>
                    answered {format(answer.createdAt, 'MMM dd, yyyy')}
                  </span>
                </p>
              </Link>

              <Votes
                type='Answer'
                itemId={JSON.stringify(answer._id)}
                upvotes={answer.upvotes.length}
                downvotes={answer.downvotes.length}
                hasUpVoted={
                  userId ? answer.upvotes.includes(JSON.parse(userId)) : false
                }
                hasDownVoted={
                  userId ? answer.downvotes.includes(JSON.parse(userId)) : false
                }
                authorId={JSON.stringify(answer.author._id)}
                userId={userId}
              />
            </div>
            {/* answer content */}
            <ParseHTML data={answer.content} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllAnswers;
