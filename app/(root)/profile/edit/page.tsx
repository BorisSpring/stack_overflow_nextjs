import React from 'react';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import EditProfile from '@/components/forms/EditProfile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Profile Informations',
  description: 'Edit your account information on this page',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
};

const page = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const user = await getUserById({ userId });

  if (!user) return null;

  return (
    <>
      <h1 className='h1-bold mb-5 text-dark-100 dark:text-light-900'>
        Edit Profile
      </h1>
      <EditProfile
        clerkId={userId}
        userId={JSON.stringify(user?._id)}
        name={user.name}
        username={user?.username}
        bio={user?.bio}
        location={user?.location}
        portfolioWebsite={user?.portfolioWebsite}
      />
    </>
  );
};

export default page;
