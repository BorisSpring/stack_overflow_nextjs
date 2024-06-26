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
