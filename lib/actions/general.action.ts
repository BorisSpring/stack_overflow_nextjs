'use server';
import { executeMethodWithTryCatch } from '../utils';
import { GlobSearchParams } from './shared.types';

import Question from '@/database/question.model';
import Answer from '@/database/answer.model';
import User from '@/database/user.model';
import Tag from '@/database/tag.model';

const searchAbleTypes = ['question', 'answer', 'tag', 'user'];

export async function globalSearch(params: GlobSearchParams) {
  return await executeMethodWithTryCatch(async () => {
    const { type, searchQuery } = params;
    const regexQuery = { $regex: searchQuery, $options: 'i' };

    let results: any = [];

    const modelsAndTypes = [
      { model: Question, searchField: 'title', type: 'question' },
      { model: User, searchField: 'name', type: 'user' },
      { model: Answer, searchField: 'content', type: 'answer' },
      { model: Tag, searchField: 'name', type: 'tag' },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !searchAbleTypes.includes(typeLower)) {
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results = results.concat(
          transfromFields(type, searchField, queryResults, searchQuery)
        );
      }
    } else {
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);

      if (!modelInfo) throw new Error('Invalid search type!');

      const queryResults = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = transfromFields(
        typeLower,
        modelInfo.searchField,
        queryResults,
        searchQuery
      );
    }
    return JSON.stringify(results);
  });
}

const transfromFields = (
  type: string,
  searchField: string,
  items: any,
  searchQuery?: string | null | undefined
) => {
  return items.map((item: any) => ({
    type,
    title:
      type === 'answer'
        ? `Answer contaitning ${searchQuery}`
        : item[searchField],
    _id:
      type === 'user'
        ? item.clerkId
        : type === 'answer'
        ? item.question
        : item._id,
  }));
};
