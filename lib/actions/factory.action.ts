'use server';

import Answer from '@/database/answer.model';
import Question from '@/database/question.model';
import { revalidatePath } from 'next/cache';
import { executeMethodWithTryAndTransactiona } from '../utils';
import { DownVoteOrUpvoteParams } from './shared.types';

export async function upVote(params: DownVoteOrUpvoteParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const { userId, itemId, route, hasUpVoted, hasDownVoted, type } = params;

    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = {
        $addToSet: { upvotes: userId },
        $pull: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }

    const mongoModel = type === 'Question' ? Question : Answer;

    const result = await mongoModel.findByIdAndUpdate(itemId, updateQuery, {
      new: true,
    });

    if (!result) throw new Error(`${type} not found!`);

    revalidatePath(route);
  });
}

export async function downVote(params: DownVoteOrUpvoteParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const { userId, itemId, route, hasUpVoted, hasDownVoted, type } = params;

    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $addToSet: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downvotes: userId },
      };
    }

    const mongoModel = type === 'Question' ? Question : Answer;

    const result = await mongoModel.findByIdAndUpdate(itemId, updateQuery, {
      new: true,
    });

    if (!result) throw new Error(`${type} not found!`);

    revalidatePath(route);
  });
}
