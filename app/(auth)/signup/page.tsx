import Link from 'next/link';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Sparkles, KeyRound, Pencil} from 'lucide-react';
import Form from './form';
import QuickstartButton from '@/app/components/QuickstartButton';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';

export default async function Signup() {
  const session = await getServerSession();

  if (session) {
    redirect('/home');
  }

  return (
    <>
      <div className="flex flex-col gap-y-[16px] text-primary">
        <h1 className="mb-1 text-2xl font-semibold">Get started</h1>
        <Form />
      </div>
      <div className="mt-6 text-subdued">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-accent">
          Log in
        </Link>
      </div>
    </>
  );
}
