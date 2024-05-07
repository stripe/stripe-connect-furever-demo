'use client';

import * as React from 'react';
import Link from 'next/link';
import {signIn, useSession} from 'next-auth/react';
import {redirect, useRouter} from 'next/navigation';
import {ArrowRight, Loader2} from 'lucide-react';
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
import { DialogClose } from '@/components/ui/dialog';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function EditAccountForm() {
  const router = useRouter();
  const {data: session, update} = useSession();

  if (!session) {
    redirect('/home');
  }

  const email = session?.user?.email;
  const password = session?.user?.password;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("submitting")
    const data = {
      newEmail: values.email,
      newPassword: values.password,
    };

    // Fetch the AccountSession client secret
    const response = await fetch('/api/account_update', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // Handle errors on the client side here
      const {error} = await response.json();
      console.warn('An error occurred: ', error);
      return undefined;
    }
    else{
        const {email: newEmail, password: newPassword} = await response.json();
 
        console.log("response ok", newEmail, newPassword);
        const promise = await update(
            {user:{
                ...session.user,
                email: newEmail,
                password: newPassword,     
        }});
        console.log("updated user", promise?.user);
        router.refresh();
    }
  };

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    placeholder={email || 'login-email@gmail.com'}
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
                    placeholder={password || 'password'}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogClose asChild>
            <div className='flex flew-row justify-end'>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="submit">
              Save changes
            </Button>
            </div>
          </DialogClose>
      </form>
      
    </Form>
          </>
  );
}
