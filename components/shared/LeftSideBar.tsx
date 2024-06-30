'use client';
import React from 'react';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { Button } from '../ui/button';

const LeftSideBar = () => {
  const pathName = usePathname();
  const { userId: clerkId } = useAuth();

  return (
    <section className='background-light900_dark200  custom-scrollbar  sticky left-0 top-0 flex h-screen max-h-[1024px] flex-col justify-between overflow-y-auto border-r  px-6 pb-8 pt-28  shadow-light-200  dark:border-dark-400 dark:shadow-none max-sm:hidden lg:w-[266px]'>
      <div className='no-focus mx-auto flex w-full flex-col gap-2  pt-16 '>
        {sidebarLinks.map(({ imgURL, route, label }) => {
          const isActive = pathName === route;

          if (route === '/profile' && clerkId) {
            route = `/profile/${clerkId}`;
          }

          return (
            <Link
              key={route}
              href={route}
              className={` flex w-full items-center justify-start gap-4 whitespace-nowrap  bg-transparent p-4 ${
                isActive
                  ? 'primary-gradient rounded-[10px] text-light-900'
                  : 'text-dark300_light900'
              }`}
            >
              <Image
                src={imgURL}
                alt='icon'
                width={21.5}
                height={21.5}
                className={isActive ? ' ' : 'invert-colors'}
              />
              <p
                className={`max-md:hidden ${
                  isActive ? 'base-bold' : 'base-medium'
                }`}
              >
                {label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className='flex flex-col gap-2 '>
        <SignedOut>
          <Link
            href='/sign-in'
            className='flex items-center justify-center rounded-[10px] bg-light-800 dark:bg-dark-400'
          >
            <Button>
              <Image
                width={20}
                height={20}
                src='/assets/icons/account.svg'
                alt='login'
                className='invert-colors lg:hidden'
              />
              <p className=' primary-text-gradient font-semibold dark:text-light-900 max-lg:hidden'>
                Log In
              </p>
            </Button>
          </Link>
          <Link
            href={'/sign-up'}
            className=' flex items-center justify-center  rounded-[10px]  bg-light-700 dark:bg-dark-300'
          >
            <Button>
              <Image
                width={20}
                height={20}
                src='/assets/icons/sign-up.svg'
                alt='sign up icon'
                className='invert-colors lg:hidden'
              />
              <p className=' text-dark300_light700 font-semibold max-lg:hidden '>
                Sign Up
              </p>
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Button>
            <Image
              src='/assets/icons/arrow-left.svg'
              alt='logout icon'
              width={24}
              className='invert-colors flex items-center justify-between gap-5'
              height={24}
            />
            <p className=' text-dark300_light700 base-medium max-lg:hidden'>
              Log Out
            </p>
          </Button>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSideBar;
