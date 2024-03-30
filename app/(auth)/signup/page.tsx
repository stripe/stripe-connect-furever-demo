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
          <Link href="/login" className="text-primary font-bold">
            Login <ArrowRight className="inline w-4 mb-0.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
      <Form />
    </>
  );
}
