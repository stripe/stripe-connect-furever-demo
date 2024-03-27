import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';
import {ArrowRight} from 'lucide-react';
import Form from './form';
import Container from '@/app/components/Container';

export default async function Signup() {
  const session = await getServerSession();

  if (session) {
    return redirect('/');
  }

  return (
    <div className="flex justify-center items-center min-h-screen space-x-20">
      <div className="max-w-sm  space-y-8">
        <Image src="pose_red.svg" alt="Pose" width={150} height={23} />
        <h1 className="text-4xl font-bold">
          Manage your fitness studio with ease
        </h1>
        <p>Pose is the world&apos;s leading health and wellness platform.</p>
      </div>
      <Container>
        <div className="min-w-96">
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
      </Container>
    </div>
  );
}
