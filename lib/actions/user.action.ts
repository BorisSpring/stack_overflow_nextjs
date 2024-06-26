'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { CreateUserParams, DeleteUserParams } from './shared.types';
import mongoose from 'mongoose';
import Question from '@/database/question.model';

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    connectToDatabase();

    const createdUser = await User.create(userData);

    await session.commitTransaction();

    return createdUser;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

export async function deleteUser(params: DeleteUserParams) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deletedUser = await User.findOneAndDelete(params);

    if (!deletedUser) throw new Error('User not found!');

    // const userQuestionIds = await Question.find({
    //   author: deletedUser._id,
    // }).distinct('_id');

    await Question.deleteMany({ author: deletedUser._id });

    await session.commitTransaction();
    return deletedUser;
  } catch (error) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
}
