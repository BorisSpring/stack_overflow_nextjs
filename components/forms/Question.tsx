'use client';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { questionSchema } from '@/lib/validations';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { createQuestion, updateQuestion } from '@/lib/actions/question.action';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/context/themeProvider';
import { useToast } from '../ui/use-toast';

const type: any = 'create';

interface Props {
  mongoUserId?: string;
  questionId?: string;
  title?: string;
  tags?: string[];
  content?: string;
  clerkId?: string;
}

export function Question({
  mongoUserId,
  questionId,
  title,
  tags,
  content,
  clerkId,
}: Props) {
  const editorRef = useRef(null);
  const router = useRouter();
  const pathName = usePathname();
  const { mode } = useTheme();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: title ?? '',
      explanation: content ?? '',
      tags: tags ?? [],
    },
  });

  async function onSubmit(values: z.infer<typeof questionSchema>) {
    try {
      const params = {
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        path: pathName,
      };
      pathName.startsWith('/question/edit')
        ? await updateQuestion({
            ...params,
            clerkId: clerkId!,
            questionId: questionId!,
          })
        : await createQuestion({
            ...params,
            author: JSON.parse(mongoUserId!),
          });
      toast({
        title: `Successfully ${
          pathName.startsWith('/question/edit') ? 'created' : 'edited'
        } question!`,
        description: '',
      });
      router.push(questionId ? `/question/${questionId}` : '/');
    } catch (error) {
      console.error(error);
    }
  }

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue('tags', newTags);
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === 'Enter' && field.name === 'tags') {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== '') {
        if (tagValue.length > 15) {
          return form.setError('tags', {
            type: 'required',
            message: 'Tag must  be less then  15 chars long!',
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue('tags', [tagValue, ...form.getValues('tags')]);
          tagInput.value = '';
          form.clearErrors('tags');
        } else {
          form.trigger();
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-10'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-dark400_light800 font-semibold'>
                Question Title <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <Input
                  placeholder='Write Question Title'
                  {...field}
                  className='background-light800_dark300 no-focus paragraph-regular text-dark400_light800 min-h-[56px] rounded-[10px] border border-light-700 placeholder:text-light-500 dark:border-dark-400'
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Be specific and imagine you &apos; re asking question to another
                person.
              </FormDescription>
              <FormMessage className='font-semibold text-red-500 dark:text-red-400' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='explanation'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3 '>
              <FormLabel className='text-dark400_light800 font-semibold'>
                Detailed explanation of your problem?
                <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDIT_KEY}
                  onInit={(_evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={
                    content ||
                    '<p>This is the initial content of the editor.</p>'
                  }
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'codesample',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'code',
                      'fullscreen',
                      'insertdatetime',
                      'table',
                      'code',
                      'wordcount',
                    ],
                    toolbar:
                      ' codesample  | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat |  | help',
                    content_style:
                      'body { font-family: Inter; font-size:16px }',
                    skin: `${mode === 'dark' ? 'oxide-dark' : 'oxide'}`,
                    content_css: `${mode === 'dark' ? 'dark' : 'light'}`,
                  }}
                />
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className='font-semibold text-red-500 dark:text-red-400' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-dark400_light800 font-semibold'>
                Tags <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <>
                  <Input
                    placeholder='Add tags...'
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    className='background-light800_dark300 no-focus paragraph-regular text-dark400_light800 min-h-[56px] rounded-[10px] border border-light-700 placeholder:text-light-500 dark:border-dark-400'
                  />
                  {field.value?.length > 0 && (
                    <div className='flex-start mt-2.5 gap-2.5'>
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className='subtle-regular background-light800_dark300 text-light400_light500 flex items-center justify-center gap-1 border-none  py-1 capitalize'
                        >
                          {tag}
                          <Image
                            onClick={() => handleTagRemove(tag, field)}
                            src='/assets/icons/close.svg'
                            width={12}
                            height={12}
                            alt='Close icon'
                            className='cursor-pointer object-contain dark:invert'
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className='body-regular mt-2.5 text-light-500'>
                Add up to 15 tags to describe what your question is about. Start
                typing to see suggestions.You need to press enter to add tag.
              </FormDescription>
              <FormMessage className='font-semibold text-red-500 dark:text-red-400' />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={form.formState.isSubmitting}
          className='primary-gradient paragraph-medium ml-auto min-w-[173px] max-w-[173px] rounded-[6px] font-semibold  text-light-900'
        >
          {form.formState.isSubmitting ? (
            <>{type === 'edit' ? 'Editing...' : 'Posting...'}</>
          ) : (
            <>{type === 'edit' ? 'Edit' : 'Post'}</>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default Question;
