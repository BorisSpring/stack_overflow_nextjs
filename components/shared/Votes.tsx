'use client';
import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { formatNumber, showToast } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { downVote, upVote } from '@/lib/actions/factory.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { viewQuestion } from '@/lib/actions/interaction.action';

interface Props {
  type: string;
  userId?: string;
  itemId: string;
  upvotes: number;
  downvotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
  authorId: string;
}
const Votes = ({
  type,
  itemId,
  upvotes,
  downvotes,
  hasUpVoted,
  hasDownVoted,
  hasSaved,
  userId,
  authorId,
}: Props) => {
  const pathName = usePathname();
  const router = useRouter();

  const handleSave = async () => {
    if (type !== 'Question' || hasSaved === undefined) return;

    if (!userId) {
      showToast('You must be logged in!');
      return;
    }

    try {
      await toggleSaveQuestion({
        questionId: JSON.parse(itemId),
        route: pathName,
        userId: JSON.parse(userId),
        isSaved: hasSaved,
      });
      showToast(`Succesfully saved question to collection!`);
    } catch (error) {
      showToast(`Fail to save a question to collection!`);
    }
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      showToast('You must be logged in!');
      return;
    } else if (JSON.parse(authorId) === JSON.parse(userId)) {
      showToast('You u cannot up vote/ down vote your question and answers!');
      return;
    }
    const params = {
      hasUpVoted,
      hasDownVoted,
      userId: JSON.parse(userId),
      route: pathName,
      itemId: JSON.parse(itemId),
      type,
    };
    try {
      await (action === 'upvote' ? upVote(params) : downVote(params));
      showToast(
        `Succesfully  ${action === 'upvote' ? 'up voted' : 'down voted'}!`
      );
    } catch (error) {
      showToast(`Fail to ${action === 'upvote' ? 'up vote' : 'down vote'}!`);
    }
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathName, router]);

  return (
    <div className='-mt-2  flex items-start gap-5 '>
      <div className='flex gap-2.5'>
        <Button
          onClick={() => handleVote('upvote')}
          className='flex w-[42px]  items-center gap-1 p-0'
        >
          <Image
            src={`/assets/icons/${hasUpVoted ? 'upvoted' : 'upvote'}.svg`}
            height={18}
            width={18}
            alt='up vote icon'
            className='invert-colors'
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {' '}
              {formatNumber(upvotes)}
            </p>
          </div>
        </Button>
        <Button
          onClick={(e) => handleVote('downvote')}
          className='flex w-[42px] items-center gap-1 p-0'
        >
          <Image
            src={`/assets/icons/${hasDownVoted ? 'downvoted' : 'downvote'}.svg`}
            height={18}
            width={18}
            alt='up vote icon'
            className=''
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {' '}
              {formatNumber(downvotes)}
            </p>
          </div>
        </Button>
      </div>
      {type === 'Question' && (
        <Button onClick={handleSave}>
          <Image
            src={`/assets/icons/${hasSaved ? 'star-filled' : 'star'}.svg`}
            width={20}
            height={20}
            alt='save icon'
          />
        </Button>
      )}
    </div>
  );
};

export default Votes;
