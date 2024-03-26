'use client';

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Nav from './Nav';

export default function AuthenticatedAndOnboardedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const {data: session} = useSession();

  if (!session || !session.user) {
    return null;
  }

  if (!session.user.stripeAccount.details_submitted) {
    router.push('/onboarding');
  }

  return (
    <div className="flex h-full min-h-screen">
      <Nav />
      <div className="bg-secondary p-8 ml-64 flex-1 space-y-8">{children}</div>
    </div>
  );
}
