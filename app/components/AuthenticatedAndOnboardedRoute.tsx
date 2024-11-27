'use client';

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {accountDetailsSubmitted} from '@/lib/utils';

export default function AuthenticatedAndOnboardedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const {data: session, status} = useSession();

  useEffect(() => {
    if (
      status !== 'loading' &&
      !accountDetailsSubmitted(session?.user?.stripeAccount)
    ) {
      router.push('/onboarding');
    }
  }, [session, router, status]);
  if (!session || !session.user) {
    return null;
  }

  return <>{children}</>;
}
