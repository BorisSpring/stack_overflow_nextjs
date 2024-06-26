'use server';

import { connectToDatabase } from '../mongoose';

// models
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import User from '@/database/user.model';

// shared types
import { CreateQuestionParams, getQuestionsParams } from './shared.types';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';

export async function getQuestions(params: getQuestionsParams) {
  try {
    connectToDatabase();
    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User });

    return { questions };
  } catch (error) {
    console.log(error);
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    connectToDatabase();
    const { title, content, tags, author, path } = params;

    const question = await Question.create({ title, content, author });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
}
