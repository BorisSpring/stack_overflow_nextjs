'use client';
import React, { useRef } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { AnswerSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from '@/context/themeProvider';
import { usePathname } from 'next/navigation';
import { createAnswer } from '@/lib/actions/answer.action';
import Image from 'next/image';

interface Props {
  question: string;
  questionId: string;
  authorId?: string;
}

const Answer = ({ questionId, authorId, question }: Props) => {
  const editorRef = useRef(null);
  const pathName = usePathname();
  // const [isSubmitingAi, setIsSubmitingAi] = useState(false);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: '',
    },
  });

  const { mode } = useTheme();

  async function onSubmit(values: z.infer<typeof AnswerSchema>) {
    if (!authorId) return;
    try {
      await createAnswer({
        route: pathName,
        content: values.content,
        author: JSON.parse(authorId),
        questionId,
      });

      const editor = editorRef.current as any;
      if (editor) {
        editor.setContent('');
      }

      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  // const generateAiAnswer = async () => {
  //   if (!authorId) return;
  //   setIsSubmitingAi(true);
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
  //   } catch (error) {
  //   } finally {
  //     setIsSubmitingAi(false);
  //   }
  // };

  return (
    <div>
      <div className='flex flex-col items-center justify-between md:flex-row'>
        <h4 className='paragraph-semibold text-dark-300 dark:text-light-900'>
          Write your answer here
        </h4>
        <Button
          // onClick={() => {}}
          className='btn light-border-2 mb-1 flex items-center gap-2 rounded-[4px] text-dark-300 shadow-none dark:text-light-800'
        >
          <Image
            width={16}
            height={16}
            alt='star icon'
            src='/assets/icons/star.svg'
          />
          Generate an AI Answer
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor
                    key={mode}
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDIT_KEY}
                    onInit={(_evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue='<p>Write ur answer here</p>'
                    init={{
                      height: 500,
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
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='mt-3 flex justify-end'>
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              className='primary-gradient w-fit rounded-[4px] text-[16px] font-semibold tracking-wider text-light-900 transition-all duration-200 hover:bg-primary-500'
            >
              {form.formState.isSubmitting ? 'Submitting' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
