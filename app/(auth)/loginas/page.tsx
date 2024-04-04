import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import Form from './form';

export default async function LoginAs() {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Select Account</h2>
        <div>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-bold text-primary">
            Register{' '}
            <ArrowRight className="mb-0.5 inline w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
      <Form />
    </>
  );
}
