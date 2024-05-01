'use client';

import * as React from 'react';
import Link from 'next/link';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {ArrowRight,Loader2} from 'lucide-react';
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
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {
SparklesIcon
} from 'lucide-react';
import {redirect} from 'next/navigation';
import { set } from 'mongoose';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SignupForm() {

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

 const QuickstartLink = ({onClick}: {onClick: () => {}}) => {
    return(
    <Alert className='bg-offset'>
    <SparklesIcon className="h-6 w-6 stroke-primary" />
    <div>
      <AlertTitle>Use a demo account</AlertTitle>
      <AlertDescription>
        Skip onboarding and go directly to dashboard.
      </AlertDescription>
      <Link href="#" onClick={onClick} className="text-accent">
        <div className="flex flex-row gap-x-[4px] font-medium pt-2">
          <p>Continue</p>
          <ArrowRight className="size-5 inline mt-0.5" />
        </div>
      </Link>
    </div>
  </Alert>
    )
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn('signup', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      router.push('/business');
    } catch (error: any) {
      console.error('An error occurred when signing in', error);
    }
  };

  async function handleQuickstartCreation(values: z.infer<typeof formSchema>)
  {
    setLoading(true);
    await signIn('signup', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    await signIn('createprefilledaccount', {
      email: values.email,
      password: values.password,
      redirect: true,
    });
  }

  const onClick = async (values: z.infer<typeof formSchema>) => {
    try {
      handleQuickstartCreation(values);

    } catch (error: any) {
      console.error('An error occurred when signing in', error);
    }
  };

  if (loading)
  {
    return (
      <div className="flex flex-col">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p>Creating account...</p>
      </div>
    );
  }

  else {
  return (
    <div className='flex flex-col gap-y-[16px]'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-4">
        <div className="flex flex-col space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
        <div className="pb-3">
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
          className={'w-full rounded-md bg-accent p-2 font-bold text-white'}
        >
          {form.formState.isSubmitting || form.formState.isSubmitSuccessful ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
            </>
          ) : (
            <div className="flex flex-row gap-x-[6px] text-base font-medium">
            <p>Create account</p>
            <ArrowRight className="size-5 inline mt-0.5" />
          </div>
          )}
        </Button>
      </form>
    </Form>
            <QuickstartLink onClick={() => onClick(form.getValues())} />
      <div className="mt-4 text-subdued">
        Already have an account?{' '}
        <Link href="/login" className="text-accent font-semibold">
          Log in
        </Link>
      </div>
      </div>
  );
  }
}
