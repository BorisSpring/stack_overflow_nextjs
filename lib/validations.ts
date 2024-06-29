import * as z from 'zod';

export const questionSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 charachters long!')
    .max(130, 'Title must be at most 130 charachters long!'),
  explanation: z
    .string()
    .min(100, 'Explanation must be at least 100 charahcters long')
    .max(1000, 'Title must be at most 1000 charachters long!'),
  tags: z
    .array(
      z
        .string()
        .min(3, 'Tag name must be at least 3 chars')
        .max(15, 'Tag name must be at most 15 chars long!')
    )
    .max(15, 'No more then 15 tags allowed!'),
});

export const AnswerSchema = z.object({
  content: z.string().min(5, 'Content must be at least 5 charachters long'),
});

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Profile name must be at least 1 character long')
    .max(20, 'Profile name must be at most 20 characters long'),
  username: z
    .string()
    .max(20, 'Profile username must be at most 20 characters long'),
  bio: z.string().max(500, 'Bio must be at most 500 characters long'),
  location: z.string().max(50, 'Location must be at most 50 characters long'),
  portfolioWebsite: z
    .string()
    .max(250, 'Portfolio website link must be at most 250 characters long'),
});
