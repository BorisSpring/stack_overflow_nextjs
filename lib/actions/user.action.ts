'use server';

import User, { IUser } from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  SaveQuestionParams,
  findSavedQuestionsParams,
} from './shared.types';
import mongoose from 'mongoose';

import Question from '@/database/question.model';
import {
  executeMethodWithTryAndTransactiona,
  executeMethodWithTryCatch,
} from '../utils';
import { revalidatePath } from 'next/cache';
import Tag from '@/database/tag.model';

// export async function getUserById(
//   params: GetUserByIdParams
// ): Promise<IUser | null> {
//   try {
//     await connectToDatabase(); // Ensure this is an async function if it returns a promise

//     const { userId } = params;
//     const user = await User.findOne({ clerkId: userId }).lean<IUser>();
//     return user;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
export async function getUserById(
  params: GetUserByIdParams
): Promise<IUser | null> {
  return await executeMethodWithTryCatch(async () => {
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId }).lean<IUser>();
    return user;
  });
}

export async function createUser(userData: CreateUserParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const createdUser = await User.create(userData);
    return createdUser;
  });
}

export async function deleteUser(params: DeleteUserParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const deletedUser = await User.findOneAndDelete(params);

    if (!deletedUser) throw new Error('User not found!');

    // const userQuestionIds = await Question.find({
    //   author: deletedUser._id,
    // }).distinct('_id');

    await Question.deleteMany({ author: deletedUser._id });

    return deletedUser;
  });
}

export async function getAllUsers(params: GetAllUsersParams) {
  return await executeMethodWithTryCatch(async () => {
    const users = await User.find({}).sort({ joinedAt: -1 });

    return { users };
  });
}

export async function saveQuestion(params: SaveQuestionParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const { questionId, route, userId, isSaved } = params;

    const question = await Question.findById(questionId);

    if (!question) throw new Error('Question not found!');

    const queryObject = isSaved
      ? { $pull: { saved: questionId } }
      : { $addToSet: { saved: questionId } };

    const updatedUser = await User.findByIdAndUpdate(userId, queryObject, {
      new: true,
    });

    if (!updatedUser) throw new Error('User not found!');

    revalidatePath(route);
  });
}

export async function findSavedQuestions(params: findSavedQuestionsParams) {
  return await executeMethodWithTryCatch(async () => {
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const user = await User.findOne({ clerkId })
      .select('saved')
      .populate({
        path: 'saved',
        match: {},
        options: {
          sort: { createdAt: -1 },
        },
        select:
          'title content  tags  views upvotes  downvotes  author  createdAt',
        populate: [
          { path: 'tags', model: Tag, select: 'name' },
          { path: 'author', model: User, select: 'clerkId picture name' },
        ],
      })
      .skip((page - 1) * pageSize);

    if (!user) throw new Error('User not found!');

    return user;
  });
}
