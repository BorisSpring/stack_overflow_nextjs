'use client';
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
import { profileSchema } from '@/lib/validations';
import { Textarea } from '../ui/textarea';
import { UpdateUserDetailsParams } from '@/lib/actions/shared.types';
import { updateUserDetails } from '@/lib/actions/user.action';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { now } from 'mongoose';
import { format } from 'date-fns';

interface Props extends UpdateUserDetailsParams {
  clerkId: string;
}

const EditProfile = ({
  userId,
  name,
  username,
  bio,
  location,
  portfolioWebsite,
  clerkId,
}: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || '',
      username: username || '',
      bio: bio || '',
      location: location || '',
      portfolioWebsite: portfolioWebsite || '',
    },
  });

  async function onHandleSubmit(values: z.infer<typeof profileSchema>) {
    await updateUserDetails({
      userId: JSON.parse(userId),
      name: values.name,
      bio: values.bio,
      username: values.username,
      location: values.location,
      portfolioWebsite: values.portfolioWebsite,
    });

    toast({
      title: 'Successfully updated profile details!',
      description: `${format(Date.now(), 'EEE d MMMM, h:mm a')}`,
    });

    router.push(`/profile/${clerkId}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onHandleSubmit)}
        className='flex flex-col space-y-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='paragraph-semibold text-dark-400 dark:text-light-800'>
                Full Name <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className='paragraph-semibold min-h-[53px] rounded-[6px]  border border-light-700 bg-light-800  px-6 py-4 text-dark-300 placeholder:text-dark-500 dark:border-dark-400 dark:bg-dark-300 dark:font-[400] dark:text-light-900 dark:placeholder:text-light-400'
                  placeholder='Write your name here'
                  {...field}
                />
              </FormControl>
              <FormDescription className='text-sm font-medium text-dark-500 dark:text-light-400'>
                This is your public display name.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='paragraph-semibold text-dark-400 dark:text-light-800'>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  className='paragraph-semibold min-h-[53px]  rounded-[6px]  border border-light-700 bg-light-800  px-6 py-4 text-dark-300 placeholder:text-dark-500 dark:border-dark-400 dark:bg-dark-300 dark:font-[500] dark:text-light-900 dark:placeholder:text-light-400'
                  placeholder='Username'
                  {...field}
                />
              </FormControl>
              <FormDescription className='text-sm font-medium text-dark-500 dark:text-light-400'>
                This is your public display username.
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='portfolioWebsite'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='paragraph-semibold text-dark-400 dark:text-light-800'>
                Portfolio website link
              </FormLabel>
              <FormControl>
                <Input
                  className='paragraph-semibold min-h-[53px] rounded-[6px]  border border-light-700 bg-light-800  px-6 py-4 text-dark-300 placeholder:text-dark-500 dark:border-dark-400 dark:bg-dark-300 dark:font-[500] dark:text-light-900 dark:placeholder:text-light-400'
                  placeholder='Portfolio website link...'
                  {...field}
                />
              </FormControl>
              <FormDescription className='text-sm font-medium text-dark-500 dark:text-light-400'>
                Link that will guide user to your portfolio website
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='paragraph-semibold text-dark-400 dark:text-light-800'>
                Location
              </FormLabel>
              <FormControl>
                <Input
                  className='paragraph-semibold min-h-[53px]  rounded-[6px]  border border-light-700 bg-light-800  px-6 py-4 text-dark-300 placeholder:text-dark-500 dark:border-dark-400 dark:bg-dark-300 dark:font-[500] dark:text-light-900 dark:placeholder:text-light-400'
                  placeholder='Write your location here...'
                  {...field}
                />
              </FormControl>
              <FormDescription className='text-sm font-medium text-dark-500 dark:text-light-400'>
                Write where are you currently located at
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='paragraph-semibold text-dark-400 dark:text-light-800'>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  className='paragraph-semibold min-h-[53px]  rounded-[6px]  border border-light-700 bg-light-800  px-6 py-4 text-dark-300 placeholder:text-dark-500 dark:border-dark-400 dark:bg-dark-300 dark:font-[500] dark:text-light-900 dark:placeholder:text-light-400'
                  placeholder='Write your bio here...'
                  {...field}
                />
              </FormControl>
              <FormDescription className='text-sm font-medium text-dark-500 dark:text-light-400'>
                Write your details about bio
              </FormDescription>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={form.formState.isSubmitting}
          className='paragraph-medium primary-gradient  min-w-[173px]  self-end rounded-[8px] px-4 py-3 text-light-900'
        >
          {form.formState.isSubmitting ? 'Editing...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
};

export default EditProfile;
