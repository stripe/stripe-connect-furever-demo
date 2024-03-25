'use client';

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useOnboarded} from '../hooks/useOnboarded';
import Navigation from '../Navigation';

export default function AuthenticatedAndOnboardedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {loading, onboarded} = useOnboarded();
  const router = useRouter();
  const {data: session} = useSession();

  if (!session || !session.user || loading) {
    return null;
  }

  if (!onboarded) {
    router.push('/onboarding');
  }

  return (
    <div className="flex h-full min-h-screen">
      <Navigation />
      <div className="bg-secondary p-8 ml-64 flex-1 space-y-8">{children}</div>
    </div>
  );
}
