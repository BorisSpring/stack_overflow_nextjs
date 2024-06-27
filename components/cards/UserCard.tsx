import Image from 'next/image';
import React from 'react';
import RedenerTag from '../shared/RedenerTag';
import Link from 'next/link';
import { getTopInteractiveTags } from '@/lib/actions/tag.action';

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
      <article className=' flex flex-col items-center justify-center gap-3 p-[30px] '>
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
        <div className='mt-1 flex flex-wrap items-center justify-center gap-2.5'>
          {tags?.length > 4 ? (
            tags.map(({ _id, name }) => (
              <RedenerTag key={_id} _id={_id} name={name} showCount={false} />
            ))
          ) : (
            <div className='text-dark300_light700 mx-auto text-center font-semibold'>
              No tags yet
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
