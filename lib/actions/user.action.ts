'use server';

import User, { IUser } from '@/database/user.model';
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  SaveQuestionParams,
  UpdateUserDetailsParams,
  findSavedQuestionsParams,
  getUserAnswerParams,
  getUserInfoParams,
  getUserTopQuestionsParams,
} from './shared.types';

import Question from '@/database/question.model';
import {
  executeMethodWithTryAndTransactiona,
  executeMethodWithTryCatch,
} from '../utils';
import { revalidatePath } from 'next/cache';
import Tag from '@/database/tag.model';
import Answer from '@/database/answer.model';
import { FilterQuery } from 'mongoose';

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
    const { page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { username: { $regex: new RegExp(searchQuery, 'i') } },
        { name: { $regex: new RegExp(searchQuery, 'i') } },
        { email: { $regex: new RegExp(searchQuery, 'i') } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case 'new_users':
        sortOptions = { joinedAt: -1 };
        break;
      case 'old_users':
        sortOptions = { joinedAt: 1 };
        break;
      case 'top_contributors':
        sortOptions = { reputation: -1 };
        break;
      default:
        break;
    }

    const users = await User.find(query)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return { users };
  });
}

export async function toggleSaveQuestion(params: SaveQuestionParams) {
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

    const query: FilterQuery<typeof Question> = searchQuery
      ? {
          $or: [
            { title: { $regex: new RegExp(searchQuery, 'i') } },
            { content: { $regex: new RegExp(searchQuery, 'i') } },
          ],
        }
      : {};
    let sortOptions = {};

    switch (filter) {
      case 'most-recent':
        sortOptions = { createdAt: -1 };
        break;
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'most_voted':
        sortOptions = { upvotes: -1 };
        break;
      case 'most_viewed':
        sortOptions = { views: -1 };
        break;
      case 'most_answered':
        sortOptions = { answers: -1 };
        break;
      default:
        break;
    }

    const user = await User.findOne({ clerkId })
      .select('saved')
      .populate({
        path: 'saved',
        match: query,
        options: {
          sort: sortOptions,
        },
        select:
          'title content  tags  views upvotes  downvotes answers  author  createdAt',
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

export async function getUserInfo(params: getUserInfoParams) {
  return await executeMethodWithTryCatch(async () => {
    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    if (!user) throw new Error('User not found!');

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
  });
}

export async function getUserTopQuestions(params: getUserTopQuestionsParams) {
  return await executeMethodWithTryCatch(async () => {
    const { author, page = 1, pageSize = 10 } = params;

    const questions = await Question.find({ author })
      .skip((page - 1) * pageSize)
      .select(
        'title content  tags  views upvotes  downvotes  author  createdAt'
      )
      .sort({ views: -1, upvotes: -1 })
      .populate([
        { path: 'author', model: User, select: 'name picture clerkId' },
        { path: 'tags', model: Tag, select: 'name' },
        { path: 'author', model: User, select: 'clerkId picture name' },
      ]);

    return questions;
  });
}

export async function getUserAnswers(params: getUserAnswerParams) {
  return await executeMethodWithTryCatch(async () => {
    const { author, page = 1, pageSize = 10 } = params;

    const answers = await Answer.find({ author })
      .skip((page - 1) * pageSize)
      .sort({ upvotes: -1 })
      .populate([
        { path: 'question', select: 'title createdAt' },
        { path: 'author', select: 'clerkId picture name' },
      ]);

    return answers;
  });
}

export async function updateUserDetails(params: UpdateUserDetailsParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const { userId, ...updateParams } = params;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updateParams,
      { new: true }
    );

    if (!updatedUser) throw new Error('Fail to update user!');

    revalidatePath(`/profile/${updatedUser.clerkId}`);
  });
}
