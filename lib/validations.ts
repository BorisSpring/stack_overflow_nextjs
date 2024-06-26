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
