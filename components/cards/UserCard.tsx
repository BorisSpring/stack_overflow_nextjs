import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { getTopInteractiveTags } from '@/lib/actions/tag.action';
import { Badge } from '../ui/badge';

interface Props {
  user: {
    clerkId: string;
    _id: string;
    name: string;
    username?: string;
    picture: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const tags = await getTopInteractiveTags({ userId: user._id });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className='background-light900_dark200 w-[260px] rounded-[10px] border border-light-900 shadow-light-100  dark:border-dark-300 dark:shadow-none max-xs:w-full'
    >
      <article className=' flex flex-col items-center justify-center gap-3 px-[10px] py-[20px] '>
        <Image
          width={100}
          height={100}
          alt='User avatar'
          src={user.picture}
          className='rounded-full'
        />
        <div>
          <h3 className='h3-bold text-dark200_light900 line-clamp-1 text-center '>
            {user.name}
          </h3>
          {user?.username && (
            <p className=' text-dark500_light500 mt-1 text-center '>
              @{user?.username}
            </p>
          )}
        </div>
        <div className='mt-auto flex flex-wrap items-center justify-center gap-2.5'>
          {tags?.length > 0 ? (
            tags.map(({ _id, name }: any) => (
              <Badge
                key={_id}
                className='small-medium background-light800_dark300 text-dark500_light700 w-fit  rounded-[8px] border-none p-2 uppercase  text-dark-300 dark:text-light-700 '
              >
                {name}
              </Badge>
            ))
          ) : (
            <div className='text-dark300_light700 mx-auto text-center font-semibold'>
              User hasnt use any tags yet!
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
