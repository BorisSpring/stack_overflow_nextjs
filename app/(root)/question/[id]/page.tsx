import Answer from '@/components/forms/Answer';
import AllAnswers from '@/components/shared/AllAnswers';
import Metric from '@/components/shared/Metric';
import ParseHTML from '@/components/shared/ParseHTML';
import RedenerTag from '@/components/shared/RedenerTag';
import Votes from '@/components/shared/Votes';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { formatNumber, getTimeStamp } from '@/lib/utils';
import { URLProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Look up a Question',
  description: 'Look up for a specifig question in devflow!',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
};

const page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionById({
    questionId: params.id,
    filter: searchParams.filter,
    page: Number(searchParams.page || 1),
  });
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <main className='flex flex-col gap-4 lg:gap-7'>
      {/* actions user details about question */}
      <div className='flex min-h-[56px] justify-between  '>
        <Link
          href={`/profile/${result?.question?.author?.clerkId}`}
          className='flex items-center gap-1 self-end '
        >
          <Image
            src={result?.question?.author.picture}
            className='rounded-full'
            width={22}
            height={22}
            alt='User avatar'
          />
          <p className='paragraph-semibold text-dark300_light700'>
            {result?.question?.author.name}
          </p>
        </Link>
        <Votes
          userId={JSON.stringify(mongoUser?._id)}
          type='Question'
          itemId={JSON.stringify(params.id)}
          upvotes={result?.question?.upvotes?.length || 0}
          downvotes={result?.question?.downvotes?.length || 0}
          hasUpVoted={result?.question?.upvotes?.includes(mongoUser?._id)}
          hasDownVoted={result?.question?.downvotes?.includes(mongoUser?._id)}
          hasSaved={mongoUser?.saved
            .map((id) => id.toString())
            .includes(params.id)}
          authorId={JSON.stringify(result?.question?.author._id)}
        />
      </div>
      {/* title */}
      <h2 className='h2-semibold text-dark200_light800 '>
        {result?.question?.title}
      </h2>

      {/* metrics */}
      <div className='flex items-center gap-4'>
        <Metric
          imageUrl='/assets/icons/clock.svg'
          alt='clock icon'
          value={getTimeStamp(result?.question?.createdAt)}
          title=' Votes'
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imageUrl='/assets/icons/message.svg'
          alt='messages'
          value={formatNumber(result?.question?.answers?.length ?? 0)}
          title=' Answers'
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imageUrl='/assets/icons/eye.svg'
          alt='eye'
          value={formatNumber(result?.question?.views || 0)}
          title=' Views'
          textStyles='small-medium text-dark400_light800'
        />
      </div>

      {/* result?.question content */}
      <ParseHTML data={result?.question?.content} />

      {/* result?.questions tags */}
      <div className='flex flex-wrap gap-2'>
        {result?.question?.tags.map((tag: any) => (
          <RedenerTag key={tag._id} name={tag.name} _id={tag._id} />
        ))}
      </div>

      <AllAnswers
        page={Number(searchParams.page || 1)}
        answers={result?.question?.answers}
        totalPages={result?.totalPages}
        userId={JSON.stringify(mongoUser?._id)}
      />

      {/* answer form */}
      <Answer
        question={result?.question?.content}
        questionId={params.id}
        authorId={JSON.stringify(mongoUser?._id)}
      />
    </main>
  );
};

export default page;
