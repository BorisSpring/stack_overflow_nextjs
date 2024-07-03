'use client';
import React from 'react';
import Image from 'next/image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import Link from 'next/link';
import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '../../ui/button';
import { usePathname } from 'next/navigation';

interface Props {
  clerkId?: string | null;
}

export const NavContent = ({ clerkId }: Props) => {
  const pathName = usePathname();
  return (
    <section className=' no-focus flex w-[302px]  flex-col gap-2 pt-16 focus:ring-0 '>
      {sidebarLinks.map(({ imgURL, route, label }) => {
        const isActive = pathName === route;
        if (route === '/profile') {
          route = clerkId ? `${route}/${clerkId}` : '/sign-in';
        }
        return (
          <SheetClose asChild key={route} className=' no-focus '>
            <Link
              href={route}
              className={`  flex w-full items-center justify-start gap-4  bg-transparent p-4 ${
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
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                {label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = ({ clerkId }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          height={24}
          width={24}
          src='/assets/icons/hamburger.svg'
          alt='hamburger icon'
          className='invert-colors lg:hidden'
        />
      </SheetTrigger>
      <SheetContent
        aria-describedby='Navigation'
        side='left'
        className='no-focus flex min-h-screen w-[350px] flex-col justify-between overflow-y-auto border-none bg-light-900  dark:bg-dark-200'
      >
        <div>
          <Link href='/' className='flex items-center gap-1'>
            <Image
              src='/assets/images/site-logo.svg'
              width={23}
              height={23}
              alt='Devflow'
            />
            <p className=' h2-bold  text-dark-100 dark:text-light-900 '>
              Dev <span className=' text-primary-500'>Overflow</span>
            </p>
          </Link>
          <SheetClose className='no-focus'>
            <NavContent clerkId={clerkId} />
          </SheetClose>
        </div>
        <SignedOut>
          <div className='mt-10 flex flex-col gap-3'>
            <SheetClose asChild>
              <Link href='/sign-in'>
                <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-[10px] px-4 py-3 shadow-none dark:bg-dark-400'>
                  <span className=' primary-text-gradient font-semibold'>
                    Log In
                  </span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href='/sign-up'>
                <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-[10px] px-4 py-3 shadow-none dark:bg-dark-300'>
                  <span className='font-semibold text-dark-400 dark:text-light-700'>
                    Sign up
                  </span>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-[10px] px-4 py-3 shadow-none dark:bg-dark-300'>
              <span className='font-semibold text-dark-400 dark:text-light-700'>
                Log Out
              </span>
            </Button>
          </SignOutButton>
        </SignedIn>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
