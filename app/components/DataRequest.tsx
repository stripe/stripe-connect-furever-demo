'use client';
import {useSession} from 'next-auth/react';
import * as React from 'react';

export const DataRequest = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {data: session, update} = useSession();
  React.useEffect(() => {
    const fetchData = async () => {
      console.log('fetching data', session?.user.setup, session?.user);
      if (session?.user.setup) {
        return;
      }
      const info = await fetch('/api/account_info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (info.ok) {
        const data = await info.json();
        if (data.setup) {
          await update({
            user: {
              ...session?.user,
              setup: true,
            },
          });
          return;
        }
      } else {
        console.error('Failed to fetch account info:', info.status);
      }

      const res = await fetch('/api/setup_accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        await update({
          user: {
            ...session?.user,
            setup: true,
          },
        });
      }
    };
    setTimeout(() => fetchData(), 10000);
  });

  return <>{children}</>;
};
