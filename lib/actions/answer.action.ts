'use server';
import { CreateAnswerParams, getAllAnswersParams } from './shared.types';
import Answer from '@/database/answer.model';
import Question from '@/database/question.model';
import { revalidatePath } from 'next/cache';
import { executeMethodWithTryAndTransactiona } from '../utils';

export async function tryCatchUtil(executeFunction: any) {
  try {
    await executeFunction();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createAnswer(params: CreateAnswerParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const { author, content, route, questionId } = params;

    const answer = await Answer.create({
      author,
      content,
      question: questionId,
    });

    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer._id },
    });

    revalidatePath(route);
    return answer;
  });
}
