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
      .sort({ views: -1, upvotes: -1 })
      .limit(5)
      .select('title');
  });
}
