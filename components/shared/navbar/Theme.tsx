'use client';
import React from 'react';
import { useTheme } from '@/context/themeProvider';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import Image from 'next/image';
import { themes } from '@/constants';

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className='relative border-none bg-transparent shadow-none'>
      <MenubarMenu>
        <MenubarTrigger className='cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200  data-[state=open]:dark:bg-dark-200'>
          <Image
            src={`/assets/icons/${mode === 'light' ? 'sun' : 'moon'}.svg`}
            alt='Sun darkmode toggle icon'
            width={20}
            height={20}
            className='active-theme'
          />
        </MenubarTrigger>
        <MenubarContent className='absolute -right-12 z-[999] mt-3 min-w-[120px] rounded border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300'>
          {themes.map(({ label, value, icon }) => (
            <MenubarItem
              key={label}
              onClick={() => {
                setMode(value);
                value !== 'system'
                  ? (localStorage.theme = value)
                  : localStorage.removeItem('theme');
              }}
              className='flex cursor-pointer items-center gap-4 px-2.5 py-2 focus:bg-light-700 dark:focus:bg-dark-400'
            >
              <Image
                src={icon}
                alt='icon'
                width={16}
                height={16}
                className={`${mode === value && 'active-theme'} `}
              />
              <p
                className={`font-semibold  text-light-500 ${
                  mode === value && 'text-primary-500'
                }`}
              >
                {label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
