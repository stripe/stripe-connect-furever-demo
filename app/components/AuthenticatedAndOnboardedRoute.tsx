'use client';

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function AuthenticatedAndOnboardedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const {data: session, status} = useSession();

  useEffect(() => {
    if (session?.user?.stripeAccount?.details_submitted === false) {
      router.push('/onboarding');
    }
  }, [session, router]);

  if (status == "unauthenticated") {
    router.push('/');
  }

  return <>{children}</>;
}
