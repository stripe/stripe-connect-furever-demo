import Link from 'next/link';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {
SparklesIcon
} from 'lucide-react';

import Form from './form';
import {ArrowRight} from 'lucide-react';

export default async function Signup() {
  const session = await getServerSession();

  if (session) {
    redirect('/home');
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold pb-2">Get started</h2>
      </div>
      <div className='flex flex-col gap-y-[16px]'>
      <Form />
      </div>
      <div className="mt-4 text-subdued">
        Already have an account?{' '}
        <Link href="/login" className="text-accent font-semibold">
          Log in
        </Link>
      </div>
    </>
  );
}
