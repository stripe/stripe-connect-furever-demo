'use client';

import Container from '@/app/components/Container';
import {useSession} from 'next-auth/react';
import React from 'react';

export default function Payouts() {
  const {data: session} = useSession();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(!session?.user.setup);
  }, [session?.user.setup]);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Payouts</h1>
      </div>
      <Container>
        <h1 className="ml-1 text-xl font-bold">Recent payouts</h1>
        <p>TODO: Payouts go here!</p>
      </Container>
    </>
  );
}
