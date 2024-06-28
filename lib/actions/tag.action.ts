'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { GetAllTagsParams, GetTopInteractiveTagsParams } from './shared.types';
import Tag from '@/database/tag.model';

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
