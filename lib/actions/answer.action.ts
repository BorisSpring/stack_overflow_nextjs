'use server';
import { CreateAnswerParams, DeleteAnswerParams } from './shared.types';
import Answer from '@/database/answer.model';
import Question from '@/database/question.model';
import { revalidatePath } from 'next/cache';
import { executeMethodWithTryAndTransactiona } from '../utils';
import User from '@/database/user.model';
import Interaction from '@/database/interaction.model';
import { ClientSession } from 'mongoose';

export async function createAnswer(params: CreateAnswerParams) {
  await executeMethodWithTryAndTransactiona(async (session: ClientSession) => {
    const { author, content, route, questionId } = params;

    const answer = await Answer.create(
      [
        {
          author,
          content,
          question: questionId,
          createdAt: new Date(),
        },
      ],
      { session }
    );

    if (!answer) throw new Error('Fail to post answer!');

    await Question.findByIdAndUpdate(
      questionId,
      {
        $push: { answers: answer._id },
      },
      { session }
    );
    revalidatePath(route);
    return answer;
  });
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  await executeMethodWithTryAndTransactiona(async (session: ClientSession) => {
    const { clerkId, itemId, route } = params;

    const user = await User.findOne({ clerkId });

    if (!user) throw new Error('User not found!');

    const answer = await Answer.findOneAndDelete(
      {
        _id: itemId,
        author: user._id,
      },
      { session }
    );

    if (!answer) throw new Error('Answer not deleted!');

    await Promise.all([
      Question.findByIdAndUpdate(
        answer.question,
        {
          $pull: { answers: answer._id },
        },
        { session }
      ),
      Interaction.deleteMany({ answer: answer._id }, { session }),
    ]);

    revalidatePath(route);
  });
}
