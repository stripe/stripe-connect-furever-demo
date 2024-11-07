'use client';

import Container from '@/app/components/Container';
import {useSession} from 'next-auth/react';
import React from 'react';
import {loadConnectAndInitialize} from '@stripe/connect-js';
import {
  ConnectComponentsProvider,
  ConnectPayouts,
} from '@stripe/react-connect-js';

export default function Payouts() {

  //TODO Fetch StripeConnectInstance to create embedded components

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Payouts</h1>
      </div>
      <Container>
        <h1 className="ml-1 text-xl font-bold">Recent payouts</h1>
        <p>TODO: Add Payouts component here!</p>
      </Container>
    </>
  );
}
