<<<<<<< HEAD
import {getServerSession} from 'next-auth';
import Link from 'next/link';

import {redirect} from 'next/navigation';

import Form from './form';
import QuickstartLink from '@/app/components/QuickstartLink';
=======
"use client";

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Sparkles, KeyRound, Pencil, ArrowRight} from 'lucide-react';
import Form from './form';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
>>>>>>> a7c3a22 (get started page update)

export default function Signup() {
  const { data: session } = useSession();

  if (session) {
    redirect('/home');
  }

  return (
    <>
<<<<<<< HEAD
      <div>
        <h2 className="pb-2 text-2xl font-semibold">Get started</h2>
      </div>
      <div className="flex flex-col gap-y-[16px]">
        <Form />
        <QuickstartLink />
        <div className="mt-4 text-subdued">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-accent">
            Log in
          </Link>
        </div>
=======
      <div className='flex flex-col gap-y-[16px]'>
        <h1 className="text-2xl font-semibold mb-1">Get started</h1>
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="create">Create an account</TabsTrigger>
            <TabsTrigger className="flex-1" value="quickstart">Quickstart</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <Form />
          </TabsContent>
          <TabsContent value="quickstart" className="flex-col flex gap-5 text-primary">
            <div className="flex gap-3">
              <Sparkles size={24} color="var(--primary)" />
              <p className="flex-1">You’ll skip account onboarding and go straight to dashboard.</p>
            </div>
            <div className="flex gap-3">
              <KeyRound size={24} color="var(--primary)" />
              <p className="flex-1">A random username and password will be chosen for you.</p>
            </div>
            <div className="flex gap-3">
              <Pencil size={24} color="var(--primary)" />
              <p className="flex-1">You can update the username and password to something memorable.</p>
            </div>
            <Button className="items-center gap-2 text-base font-medium">
              Create quickstart account
              <ArrowRight size={20} />
            </Button>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-6 text-subdued">
        Already have an account?{' '}
        <Link href="/login" className="text-accent font-semibold">
          Log in
        </Link>
>>>>>>> a7c3a22 (get started page update)
      </div>
    </>
  );
}
