import { IUser } from '@/database/user.model';
import { Schema } from 'mongoose';

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface UpdateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  clerkId: string;
  path: string;
  questionId: string;
}

export interface CreateUserParams {
  email: string;
  clerkId: string;
  name: string;
  username?: string | null;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updatedData: {
    name: string;
    email: string;
    username: string;
    picture: string;
  };
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetTopInteractiveTagsParams {
  userId: string;
  limit?: number;
}

export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
}

export interface GetQuestionByIdParams {
  questionId: string;
}

export interface CreateAnswerParams {
  questionId: string;
  author: string;
  content: string;
  route: string;
}

export interface getAllAnswersParams {
  questionId: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface DownVoteOrUpvoteParams {
  userId: string;
  itemId: string;
  route: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  type: string;
}

export interface SaveQuestionParams {
  questionId: string;
  route: string;
  userId: string;
  isSaved: boolean;
}

export interface findSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface QuestionCardProps {
  _id: string;
  title: string;
  tags?: { _id: string; name: string }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  views: number;
  answers?: Array<object>;
  upvotes: number;
  createdAt: Date;
  clerkId?: string | null;
}

export interface ViewQuestionParams {
  userId: string | undefined;
  questionId: string;
}

export interface getQuestionsByTagIdParams {
  page?: number;
  pageSize?: number;
  tagId: string;
  searchQuery?: string;
}

export interface getUserInfoParams {
  clerkId: string;
}

export interface getUserTopQuestionsParams {
  author: string;
  page?: number;
  pageSize?: number;
}

export interface getUserAnswerParams {
  author: string;
  page?: number;
  pageSize?: number;
}

export interface DeleteAnswerParams {
  clerkId: string;
  itemId: string;
  route: string;
}

export interface DeleteQuestionParams {
  clerkId: string;
  itemId: string;
  route: string;
}

export interface getQuestionToBeEditedParams {
  id: string;
  clerkId: string;
}

export interface UpdateUserDetailsParams {
  userId: string;
  name: string;
  username?: string;
  bio?: string;
  location?: string;
  portfolioWebsite?: string;
}
