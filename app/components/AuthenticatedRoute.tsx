import React from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Navigation from '../Navigation';

export default function AuthenticatedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const {data: session} = useSession();

  if (!session || !session.user) {
    return null;
  }

  return (
    <div className="flex h-full min-h-screen">
      <Navigation />
      <div className="bg-secondary p-8 ml-64 flex-1 space-y-8">{children}</div>
    </div>
  );
}
