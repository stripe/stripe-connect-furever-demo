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
    redirect('/');
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold pb-2">Get started</h2>
      </div>
      <div className='flex flex-col gap-y-[16px]'>
      <Form />
      <Alert className='bg-offset'>
        <SparklesIcon className="h-6 w-6 stroke-primary" />
        <div>
        <AlertTitle>Use a demo account</AlertTitle>
        <AlertDescription>
          Skip onboarding and go directly to dashboard.
        </AlertDescription>
        <Link href="/login" className="text-primary">
        <div className="flex flex-row gap-x-[4px] font-medium pt-2">
            <p>          Continue</p>
            <ArrowRight className="size-5 inline mt-0.5" />
          </div>
        </Link>
        </div>

      </Alert>
      </div>
      <div className="mt-4 text-subdued">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-semibold">
          Log in
        </Link>
      </div>
    </>
  );
}
