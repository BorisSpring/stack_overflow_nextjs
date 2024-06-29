'use server';

import Question from '@/database/question.model';
import { executeMethodWithTryAndTransactiona } from '../utils';
import { ViewQuestionParams } from './shared.types';
import Interaction from '@/database/interaction.model';

export async function viewQuestion(params: ViewQuestionParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        userId,
        action: 'view',
        question: questionId,
      });

      if (existingInteraction)
        return console.log('user has alerdy viewed this question');
      else {
        Interaction.create({
          user: userId,
          question: questionId,
          action: 'view',
        });
      }
    }
  });
}
