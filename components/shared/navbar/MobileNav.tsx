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
import { SignedOut } from '@clerk/nextjs';
import { Button } from '../../ui/button';
import { usePathname } from 'next/navigation';

export const NavContent = () => {
  const pathName = usePathname();
  return (
    <section className='no-focus flex w-[302px]  flex-col gap-2  pt-16 '>
      {sidebarLinks.map(({ imgURL, route, label }) => {
        const isActive = pathName === route;
        return (
          <SheetClose asChild key={route}>
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

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          height={16}
          width={16}
          src='/assets/icons/hamburger.svg'
          alt='hamburger icon'
          className='invert-colors'
        />
      </SheetTrigger>
      <SheetContent
        side='left'
        className=' w-[350px] border-none bg-light-900 dark:bg-dark-200'
      >
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
        <div>
          <SheetClose>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className='flex flex-col gap-3'>
              {/* sign in */}
              <SheetClose asChild>
                <Link href='/sign-in'>
                  <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-[10px] px-4 py-3 shadow-none dark:bg-dark-400'>
                    <span className=' primary-text-gradient font-semibold'>
                      Log In
                    </span>
                  </Button>
                </Link>
              </SheetClose>

              {/* sign up */}
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
