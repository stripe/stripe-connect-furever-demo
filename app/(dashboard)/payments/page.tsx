'use client';

import * as React from 'react';
import Container from '@/app/components/Container';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';
import {
  ConnectComponentsProvider,
  ConnectPayments,
} from '@stripe/react-connect-js';
import {loadConnectAndInitialize} from '@stripe/connect-js';

export default function Payments() {
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
        <h1 className="text-3xl font-bold">Payments</h1>
      </div>
      <div className="flex flex-col gap-3 md:gap-5 lg:flex-row">
        <div className="flex-1">
          <MonthToDateWidget />
        </div>
        <div className="flex-1">
          <CustomersWidget />
        </div>
      </div>
      <Container>
        <h1 className="text-xl font-bold">Recent payments</h1>
        <p>
          If you see no entries here, the account has no payments. You can use
          &quot;open tools&quot; -&gt; &quot;create test payments&quot; to
          create some.
        </p>
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectPayments />
        </ConnectComponentsProvider>
      </Container>
    </>
  );
}
