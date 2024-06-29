'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import {
  GetAllTagsParams,
  GetTopInteractiveTagsParams,
  getQuestionsByTagIdParams,
} from './shared.types';
import Tag, { ITag } from '@/database/tag.model';
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
  try {
    const { page = 1, pageSize = 20, filter } = params;

    const tags = await Tag.find().skip((page - 1) * pageSize);

    return { tags };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTagQuestions(params: getQuestionsByTagIdParams) {
  return await executeMethodWithTryCatch(async () => {
    const { page = 1, pageSize = 10, tagId, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter)
      .select('name questions')
      .populate({
        path: 'questions',
        model: Question,
        match: searchQuery
          ? { title: { $regEx: searchQuery, options: 'i' } }
          : {},
        options: { sort: { createdAt: -1 } },
        select:
          'title content  tags  views upvotes  downvotes  author  createdAt',
        populate: [
          { path: 'tags', model: Tag, select: 'name' },
          { path: 'author', model: User, select: 'clerkId picture name' },
        ],
      })
      .skip((page - 1) * pageSize);

    if (!tag) throw new Error('Tag not found!');

    return tag;
  });
}
