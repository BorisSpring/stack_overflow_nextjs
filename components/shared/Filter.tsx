'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import HomeFilters from '../home/HomeFilters';

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  // const onHandleSelect(value: string){
  //     console.log(value)
  // }

  return (
    <>
      <div className={`relative ${containerClasses}`}>
        <Select>
          <SelectTrigger
            className={`${otherClasses} body-regular text-dark500_light700  background-light800_dark300 rounded-[10px] border border-light-700 dark:border-dark-400 `}
          >
            <div className='line-clamp-1'>
              <SelectValue placeholder='Select A Filter' />
            </div>
          </SelectTrigger>
          <SelectContent className=' rounded-[10px] bg-light-900 dark:border-none dark:bg-dark-400'>
            <SelectGroup className='z-[9999]'>
              {filters.map(({ name, value }) => (
                <SelectItem
                  className='hover:background-light700_dark300 transition-all duration-200'
                  value={value}
                  key={value}
                >
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <HomeFilters />
    </>
  );
};

export default Filter;
