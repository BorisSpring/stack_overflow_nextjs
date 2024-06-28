'use server';

import { revalidatePath } from 'next/cache';

// models
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import User from '@/database/user.model';

// utils
import {
  executeMethodWithTryAndTransactiona,
  executeMethodWithTryCatch,
} from '../utils';

// shared types
import {
  CreateQuestionParams,
  UpdateUserParams,
  GetQuestionsParams,
  GetQuestionByIdParams,
} from './shared.types';

import Answer from '@/database/answer.model';

// export async function getQuestions(params: GetQuestionsParams) {
//   try {
//     connectToDatabase();

//     const questions = await Question.find({})
//       .populate({ path: 'tags', model: Tag })
//       .populate({ path: 'author', model: User });

//     return { questions };
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function createQuestion(params: CreateQuestionParams) {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     connectToDatabase();

//     const { title, content, tags, author, path } = params;

//     const question = await Question.create({ title, content, author });

//     const tagDocuments = [];

//     for (const tag of tags) {
//       const existingTag = await Tag.findOneAndUpdate(
//         { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
//         { $setOnInsert: { name: tag }, $push: { question: question._id } },
//         { upsert: true, new: true }
//       );
//       tagDocuments.push(existingTag._id.toString());
//     }

//     await Question.findByIdAndUpdate(question._id, {
//       $push: { tags: { $each: tagDocuments } },
//     });

//     revalidatePath(path);
//     await session.commitTransaction();
//   } catch (error) {
//     await session.abortTransaction();
//   } finally {
//     session.endSession();
//   }
// }

// export async function updateUser(params: UpdateUserParams) {
//   const { clerkId, updatedData, path } = params;

//   await User.findOneAndUpdate({ clerkId }, updatedData);

//   revalidatePath(path);
// }

// export async function getQuestionById(params: GetQuestionByIdParams) {
//   try {
//     connectToDatabase();

//     const question = await Question.findById(params).populate([
//       {
//         path: 'author',
//         model: User,
//         select: 'clerkId name picture',
//       },
//       { path: 'tags', model: Tag, select: 'name _id' },
//       {
//         path: 'answers',
//         model: Answer,
//         populate: {
//           path: 'author',
//           model: User,
//           select: 'picture clerkId name',
//         },
//         options: { sort: { createdAt: -1 } },
//       },
//     ]);

//     return question;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

export async function getQuestions(params: GetQuestionsParams) {
  return await executeMethodWithTryCatch(async () => {
    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User });

    return { questions };
  });
}

export async function createQuestion(params: CreateQuestionParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const { title, content, tags, author, path } = params;

    const question = await Question.create({ title, content, author });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id.toString());
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  });
}

export async function updateUser(params: UpdateUserParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const { clerkId, updatedData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updatedData);

    revalidatePath(path);
  });
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  return await executeMethodWithTryCatch(async () => {
    const question = await Question.findById(params).populate([
      {
        path: 'author',
        model: User,
        select: 'clerkId name picture',
      },
      { path: 'tags', model: Tag, select: 'name _id' },
      {
        path: 'answers',
        model: Answer,
        populate: {
          path: 'author',
          model: User,
          select: 'picture clerkId name',
        },
        options: { sort: { createdAt: -1 } },
      },
    ]);

    return question;
  });
}
