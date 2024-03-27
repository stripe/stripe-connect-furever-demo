import React from 'react';
import {useSession} from 'next-auth/react';

export default function AuthenticatedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {data: session} = useSession();

  if (!session || !session.user) {
    return null;
  }

  return <>{children}</>;
}
