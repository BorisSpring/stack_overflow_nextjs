import { Button } from '@/components/ui/button';
import { getUserInfo } from '@/lib/actions/user.action';
import { URLProps } from '@/types';
import { SignedIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileLink from '@/components/shared/ProfileLink';
import Stats from '@/components/shared/Stats';
import QuestionTab from '@/components/shared/QuestionTab';
import AnswerTab from '@/components/shared/AnswerTab';

const page = async ({ params, searchParams }: URLProps) => {
  const userInfo = await getUserInfo({ clerkId: params.id! });

  if (!userInfo) return;
  const { userId: clerkId } = auth();

  const { totalQuestions, totalAnswers, user } = userInfo;
  return (
    <>
      <div className='flex  flex-col-reverse items-start gap-[18px] lg:flex-row '>
        <Image
          width={140}
          height={140}
          src={user.picture!}
          alt={user.picture!}
          className='primary-gradient-border rounded-full object-cover'
        />
        <div className='mt-3'>
          <h2 className='h2-bold text-dark200_light900 whitespace-nowrap'>
            {user.name}
          </h2>
          {user?.username && (
            <p className='paragraph-regular text-dark-200 dark:text-light-800'>
              @{user?.username}
            </p>
          )}
          <div className='mt-5 flex flex-wrap items-end gap-2'>
            {user?.portfolio && (
              <ProfileLink
                imgUrl='/assets/icons/location.svg'
                title='Porfolio'
                href={user.portfolio}
              />
            )}
            {user?.location && (
              <ProfileLink
                imgUrl='/assets/icons/location.svg'
                title={user.location}
              />
            )}
            <ProfileLink
              imgUrl='/assets/icons/calendar.svg'
              title={`Joined ${format(user.joinedAt, 'MMM yyyy')}`}
            />
          </div>
          {userInfo?.bio && (
            <p className='paragraph-regular text-dark400_light800 mt-8'>
              {userInfo.bio}
            </p>
          )}
        </div>

        <div className='mt-3 flex w-full justify-end max-sm:mb-5 sm:mt-5'>
          <SignedIn>
            {clerkId === params.id && (
              <Link href='/profile/edit'>
                <Button className='primary-gradient paragraph-medium min-h-[46px] min-w-[175px] rounded-[10px] text-light-900 '>
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      {/* stats */}
      <Stats askedQuestions={totalQuestions || 0} answers={totalAnswers || 0} />

      <div className='mt-10 flex gap-10'>
        <Tabs defaultValue='top-post' className='flex-1'>
          <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
            <TabsTrigger value='top-post' className='tab'>
              Top Posts
            </TabsTrigger>
            <TabsTrigger value='answers' className='tab'>
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value='top-post'>
            <QuestionTab
              userId={user._id}
              clerkId={clerkId}
              searchParams={searchParams}
              totalQuestions={totalQuestions}
            />
          </TabsContent>
          <TabsContent value='answers'>
            <AnswerTab
              userId={user._id}
              clerkId={clerkId}
              searchParams={searchParams}
              totalAnswers={totalAnswers}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default page;
