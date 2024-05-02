import {getServerSession} from 'next-auth';
import Link from 'next/link';

import {redirect} from 'next/navigation';

import Form from './form';
import QuickstartLink from '@/app/components/QuickstartLink';


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
      <QuickstartLink/>
      <div className="mt-4 text-subdued">
        Already have an account?{' '}
        <Link href="/login" className="text-accent font-semibold">
          Log in
        </Link>
      </div>
      </div>
    </>
  );
}
