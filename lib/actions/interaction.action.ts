'use server';

import Question from '@/database/question.model';
import { executeMethodWithTryAndTransactiona } from '../utils';
import { ViewQuestionParams } from './shared.types';
import Interaction from '@/database/interaction.model';
import { ClientSession } from 'mongoose';

export async function viewQuestion(params: ViewQuestionParams) {
  await executeMethodWithTryAndTransactiona(async (session: ClientSession) => {
    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { views: 1 } },
      { new: true, session }
    );

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        userId,
        action: 'view',
        question: questionId,
      });

      if (!existingInteraction) {
        Interaction.create(
          [
            {
              user: userId,
              question: questionId,
              action: 'view',
            },
          ],
          { session }
        );
      }
    }
  });
}
