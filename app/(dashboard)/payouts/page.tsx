'use client';

import Container from '@/app/components/Container';
import {loadConnectAndInitialize} from '@stripe/connect-js';
import {
  ConnectComponentsProvider,
  ConnectPayouts,
} from '@stripe/react-connect-js';
import {useSession} from 'next-auth/react';
import React from 'react';

export default function Payouts() {
  const [stripeConnectInstance] = React.useState(() => {
    const fetchClientSecret = async () => {
      // Fetch the AccountSession client secret
      const response = await fetch('/api/account_session', {method: 'POST'});
      if (!response.ok) {
        // Handle errors on the client side here
        const {error} = await response.json();
        console.log('An error occurred: ', error);
        return undefined;
      } else {
        const {client_secret: clientSecret} = await response.json();
        return clientSecret;
      }
    };
    return loadConnectAndInitialize({
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
      fetchClientSecret: fetchClientSecret,
      appearance: {
        overlays: 'dialog',
        variables: {
          colorPrimary: '#625afa',
        },
      },
    });
  });

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Payouts</h1>
      </div>
      <Container>
        <h1 className="ml-1 text-xl font-bold">Recent payouts</h1>
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectPayouts />
        </ConnectComponentsProvider>
      </Container>
    </>
  );
}
