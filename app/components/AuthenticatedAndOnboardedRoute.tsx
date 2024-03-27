'use client';

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import Nav from './Nav';

export default function AuthenticatedAndOnboardedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const {data: session} = useSession();

  useEffect(() => {
    if (session?.user?.stripeAccount?.details_submitted === false) {
      router.push('/onboarding');
      return;
    }
  });

  if (!session || !session.user) {
    return null;
  }

  return <>{children}</>;
}
