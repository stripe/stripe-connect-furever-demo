'use client';

import * as React from 'react';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {Loader2} from 'lucide-react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SignupForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn('signup', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      router.push('/onboarding');
    } catch (error: any) {
      console.error('An error occurred when signing in', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">
        <div className="flex flex-col space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 p-2 placeholder:text-gray-400"
                    placeholder="jenny.rosen@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col space-y-2 pb-3">
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md border border-gray-300 p-2 placeholder:text-gray-400"
                    placeholder="••••••••"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={'w-full rounded-md bg-primary p-2 font-bold text-white'}
        >
          {form.formState.isSubmitting || form.formState.isSubmitSuccessful ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
            </>
          ) : (
            <>Continue</>
          )}
        </Button>
      </form>
    </Form>
  );
}
