'use client';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs';
import { deleteAnswer } from '@/lib/actions/answer.action';
import { usePathname } from 'next/navigation';
import { deleteQuestion } from '@/lib/actions/question.action';
import { showToast } from '@/lib/utils';

interface Props {
  type: string;
  itemId: string;
  loggedUserClerkId: string | null | undefined;
  authorClerkId?: string | null | undefined;
}

const EditDeleteAction = ({
  type,
  itemId,
  loggedUserClerkId,
  authorClerkId,
}: Props) => {
  const pathName = usePathname();

  const handleEditDeleteAnswerOrQuestion = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!loggedUserClerkId) {
      showToast('You must be logged in!');
      return;
    }

    const functionProps = {
      itemId,
      clerkId: loggedUserClerkId,
      route: pathName,
    };

    try {
      await (type === 'answer'
        ? deleteAnswer(functionProps)
        : deleteQuestion(functionProps));

      showToast(
        `${type === 'answer' ? 'Answer' : 'Question'} has been deleted!`
      );
    } catch (error) {
      showToast(`Fail to delete ${type === 'answer' ? 'Answer' : 'Question'}!`);
    }
  };
  return (
    <SignedIn>
      <div className='ml-auto flex items-center '>
        {type !== 'answer' && (
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
        )}
        {loggedUserClerkId === authorClerkId && (
          <Button className='pr-0' onClick={handleEditDeleteAnswerOrQuestion}>
            <Image
              src='/assets/icons/trash.svg'
              width={18}
              height={18}
              alt='delete icon'
            />
          </Button>
        )}
      </div>
    </SignedIn>
  );
};

export default EditDeleteAction;
