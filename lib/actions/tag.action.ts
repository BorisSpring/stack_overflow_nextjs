'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { GetTopInteractiveTagsParams } from './shared.types';

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
