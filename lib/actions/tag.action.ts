'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import {
  GetAllTagsParams,
  GetTopInteractiveTagsParams,
  getQuestionsByTagIdParams,
} from './shared.types';
import Tag from '@/database/tag.model';
import { executeMethodWithTryCatch } from '../utils';
import { FilterQuery } from 'mongoose';
import Question from '@/database/question.model';

export async function getTopInteractiveTags(
  params: GetTopInteractiveTagsParams
) {
  try {
    connectToDatabase();
    const { userId, limit } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found!');

    return [
      { name: 'a', _id: '1' },
      { name: 'b', _id: '3' },
      { name: 'c', _id: '2' },
    ];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  return await executeMethodWithTryCatch(async () => {
    const { page = 1, pageSize = 10, searchQuery, sortBy } = params;

    const query: FilterQuery<typeof Tag> = searchQuery
      ? { name: { $regex: new RegExp(searchQuery, 'i') } }
      : {};

    let sortOptions = {};

    switch (sortBy) {
      case 'popular':
        sortOptions = { questions: -1 };
        break;
      case 'recent':
        sortOptions = { createdOn: -1 };
        break;
      case 'name':
        sortOptions = { name: -1 };
        break;
      case 'old':
        sortOptions = { createdOn: 1 };
        break;
      default:
        break;
    }

    const [tags, totalDocuments] = await Promise.all([
      Tag.find(query)
        .sort(sortOptions)
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      Tag.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalDocuments / pageSize);

    return { tags, totalPages };
  });
}

export async function getTagQuestions(params: getQuestionsByTagIdParams) {
  return await executeMethodWithTryCatch(async () => {
    const { page = 1, pageSize = 10, tagId, searchQuery } = params;

    const questionFilter: FilterQuery<typeof Question> = searchQuery
      ? {
          $or: [
            { title: { $regex: new RegExp(searchQuery, 'i') } },
            { content: { $regex: new RegExp(searchQuery, 'i') } },
          ],
        }
      : {};

    const findTagPromise = Tag.findOne({ _id: tagId })
      .select('name questions')
      .populate({
        path: 'questions',
        model: Question,
        match: questionFilter,
        options: {
          skip: (page - 1) * pageSize,
          limit: pageSize,
          sort: { createdAt: -1 },
        },
        select:
          'title content  tags  views upvotes  downvotes  author  createdAt',
        populate: [
          { path: 'tags', model: Tag, select: 'name' },
          { path: 'author', model: User, select: 'clerkId picture name' },
        ],
      });

    const totalDocumentsPromsie = Question.countDocuments({
      tags: tagId,
      ...questionFilter,
    });

    const [tag, totalDocuments] = await Promise.all([
      findTagPromise,
      totalDocumentsPromsie,
    ]);

    if (!tag) throw new Error('Tag not found!');

    const totalPages = Math.ceil(totalDocuments / pageSize);

    return { tag, totalPages };
  });
}

export async function getHotTags() {
  return await executeMethodWithTryCatch(async () => {
    return await Tag.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: { $size: '$questions' },
        },
      },
      {
        $sort: { numberOfQuestions: -1 },
      },
      {
        $limit: 5,
      },
    ]);
  });
}
