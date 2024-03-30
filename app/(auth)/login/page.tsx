import Link from 'next/link';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';
import {ArrowRight} from 'lucide-react';
import Form from './form';

export default async function Signup() {
  const session = await getServerSession();

  if (session) {
    return redirect('/');
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Login</h2>
        <div>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary font-bold">
            Register{' '}
            <ArrowRight className="inline w-4 mb-0.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
      <Form />
    </>
  );
}
