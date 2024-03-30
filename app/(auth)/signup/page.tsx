import Link from 'next/link';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';
import {ArrowRight} from 'lucide-react';
import Form from './form';

export default async function Signup() {
  const session = await getServerSession();

  if (session) {
    redirect('/');
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Register</h2>
        <div>
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-primary">
            Login <ArrowRight className="mb-0.5 inline w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
      <Form />
    </>
  );
}
