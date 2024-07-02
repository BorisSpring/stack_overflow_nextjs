'use server';

import { revalidatePath } from 'next/cache';
import { DownVoteOrUpvoteParams } from './shared.types';
import { executeMethodWithTryAndTransactiona } from '../utils';
import User from '@/database/user.model';
import Answer from '@/database/answer.model';
import Question from '@/database/question.model';
import { ClientSession } from 'mongoose';

export async function upVote(params: DownVoteOrUpvoteParams) {
  await executeMethodWithTryAndTransactiona(async (session: ClientSession) => {
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

    // eslint-disable-next-line no-unused-vars
    const [_, result] = await Promise.all([
      User.findByIdAndUpdate(
        userId,
        {
          $inc: { reputation: hasUpVoted ? -1 : 1 },
        },
        { session }
      ),
      mongoModel.findByIdAndUpdate(itemId, updateQuery, {
        new: true,
        session,
      }),
    ]);

    if (!result) throw new Error(`${type} not found!`);

    await User.findByIdAndUpdate(
      result.author,
      {
        $inc: { reputation: hasUpVoted ? -10 : 10 },
      },
      { session }
    );

    revalidatePath(route);
  });
}

export async function downVote(params: DownVoteOrUpvoteParams) {
  await executeMethodWithTryAndTransactiona(async (session: ClientSession) => {
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

    // eslint-disable-next-line no-unused-vars
    const [_, result] = await Promise.all([
      User.findByIdAndUpdate(
        userId,
        {
          $inc: {
            reputation: hasDownVoted
              ? type === 'answer'
                ? 2
                : 1
              : type === 'answer'
              ? -2
              : -1,
          },
        },
        { session }
      ),
      mongoModel.findByIdAndUpdate(itemId, updateQuery, {
        new: true,
        session,
      }),
    ]);

    if (!result) throw new Error(`${type} not found!`);

    await User.findByIdAndUpdate(
      result.author,
      {
        $inc: { reputation: hasDownVoted ? 10 : -10 },
      },
      { session }
    );

    revalidatePath(route);
  });
}
