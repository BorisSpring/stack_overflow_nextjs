'use client';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs';
import { deleteAnswer } from '@/lib/actions/answer.action';
import { usePathname } from 'next/navigation';
import { deleteQuestion } from '@/lib/actions/question.action';
import { useToast } from '../ui/use-toast';
import { format } from 'date-fns';

interface Props {
  type: string;
  itemId: string;
  loggedUserClerkId: string | null | undefined;
}

const EditDeleteAction = ({ type, itemId, loggedUserClerkId }: Props) => {
  const pathName = usePathname();
  const { toast } = useToast();

  const handleEditDeleteAnswerOrQuestion = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!loggedUserClerkId) return;

    const functionProps = {
      itemId,
      clerkId: loggedUserClerkId,
      route: pathName,
    };

    await (type === 'answer'
      ? deleteAnswer(functionProps)
      : deleteQuestion(functionProps));

    toast({
      title: `${type === 'answer' ? 'Answer' : 'Question'} has been deleted!`,
      description: `${format(Date.now(), 'ddd, MMM dd, yyyy at h:mm a')}`,
    });
  };
  return (
    <SignedIn>
      <div className='ml-auto flex items-center '>
        <Link
          href={
            type === 'answer'
              ? `/answers/${itemId}`
              : `/question/edit/${itemId}`
          }
        >
          <Image
            src='/assets/icons/edit.svg'
            width={18}
            height={18}
            alt='edit icon'
          />
        </Link>
        <Button className='pr-0' onClick={handleEditDeleteAnswerOrQuestion}>
          <Image
            src='/assets/icons/trash.svg'
            width={18}
            height={18}
            alt='delete icon'
          />
        </Button>
      </div>
    </SignedIn>
  );
};

export default EditDeleteAction;
