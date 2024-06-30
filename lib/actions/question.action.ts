'use server';

import { revalidatePath } from 'next/cache';

// models
import Question from '@/database/question.model';
import Tag, { ITag } from '@/database/tag.model';
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
  DeleteQuestionParams,
  getQuestionToBeEditedParams,
  UpdateQuestionParams,
} from './shared.types';

import Answer from '@/database/answer.model';
import Interaction from '@/database/interaction.model';
import { FilterQuery } from 'mongoose';

export async function getQuestions(params: GetQuestionsParams) {
  return await executeMethodWithTryCatch(async () => {
    const { searchQuery, page = 1, pageSize = 10, filter } = params;

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
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'frequent':
        sortOptions = { views: -1 };
        break;
      case 'unanswered':
        query.answers = { $size: 0 };
        break;
      case 'recommended':
        break;
      default:
        break;
    }

    const questions = await Question.find(query)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate([
        { path: 'tags', model: Tag },
        { path: 'author', model: User },
      ]);

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
        {
          $setOnInsert: { name: tag },
          $push: { questions: question._id },
        },
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
    const { questionId, filter } = params;

    let sortAnswerOptions = {};

    switch (filter) {
      case 'highestUpvotes':
        sortAnswerOptions = { upvotes: -1 };
        break;
      case 'lowestUpvotes':
        sortAnswerOptions = { upvotes: 1 };
        break;
      case 'recent':
        sortAnswerOptions = { createdAt: -1 };
        break;
      case 'old':
        sortAnswerOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    const question = await Question.findById(questionId).populate([
      {
        path: 'author',
        model: User,
        select: 'clerkId name picture',
      },
      { path: 'tags', model: Tag, select: 'name _id' },
      {
        path: 'answers',
        options: {
          sort: sortAnswerOptions,
        },
        model: Answer,
        populate: {
          path: 'author',
          model: User,
          select: 'picture clerkId name',
        },
      },
    ]);

    if (!question) throw new Error('Question not found!');

    return question;
  });
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const { clerkId, itemId, route } = params;

    const user = await User.findOne({ clerkId });

    if (!user) throw new Error('User not found!');

    const deletedQuestion = await Question.findOneAndDelete({
      _id: itemId,
      author: user._id,
    });

    if (!deletedQuestion) throw new Error('Fail to delete question!');

    await Promise.all([
      Interaction.deleteMany({ question: deletedQuestion._id }),
      Answer.deleteMany({ question: deletedQuestion._id }),
      Tag.updateMany(
        { questions: deletedQuestion._id },
        { $pull: { questions: deletedQuestion._id } }
      ),
    ]);

    revalidatePath(route);
  });
}

export async function getQuestionToBeEdited(
  params: getQuestionToBeEditedParams
) {
  return await executeMethodWithTryAndTransactiona(async () => {
    const { id, clerkId } = params;

    const question = await Question.findOne({ _id: id })
      .populate([
        {
          path: 'author',
          select: 'picture name clerkId',
        },
        { path: 'tags', select: 'name' },
      ])
      .select('content title tags author');

    if (!question) throw new Error('Question not found!');

    if (question.author.clerkId !== clerkId)
      throw new Error('You cannot update other use question!');

    return question;
  });
}

export async function updateQuestion(params: UpdateQuestionParams) {
  await executeMethodWithTryAndTransactiona(async () => {
    const { title, content, tags, path, questionId } = params;

    const question = await Question.findById(questionId).populate({
      path: 'tags',
      select: 'name',
    });

    if (!question) throw new Error('Question not found!');

    const currentTagsName = question.tags.map((tag: ITag) => tag.name);

    const tagsToAdd = tags.filter(
      (tagName) => !currentTagsName.includes(tagName)
    );

    for (const tag of tagsToAdd) {
      const tagFromDb = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}`, 'i') },
        },
        { $setOnInsert: { name: tag }, $push: { questions: questionId } },
        { new: true, upsert: true }
      );
      question.tags.push(tagFromDb._id);
    }

    const tagsToRemove = currentTagsName.filter(
      (tagName: string) => !tags.includes(tagName)
    );

    await Tag.updateMany(
      { name: { $in: tagsToRemove } },
      { $pull: { questions: questionId } }
    );

    question.content = content;
    question.title = title;
    question.tags = question.tags.filter(
      (tag: ITag) => !tagsToRemove.includes(tag.name)
    );
    await question.save();

    revalidatePath(path);
  });
}

export async function hotQuestions() {
  return await executeMethodWithTryCatch(async () => {
    return await Question.find()
      .limit(5)
      .sort({ views: -1, upvotes: -1 })
      .select('title');
  });
}
