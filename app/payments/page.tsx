'use client';

import {useConnect} from '../hooks/useConnect';

import {
  ConnectComponentsProvider,
  ConnectPayments,
} from '@stripe/react-connect-js';
import AuthenticatedAndOnboardedRoute from '../components/AuthenticatedAndOnboardedRoute';
import Container from '../components/Container';

export default function Payouts() {
  const {hasError, stripeConnectInstance} = useConnect();

  if (hasError || !stripeConnectInstance) {
    return null;
  }

  return (
    <AuthenticatedAndOnboardedRoute>
      <h1 className="text-3xl font-bold">Payments</h1>
      <Container>
        <h1 className="text-lg font-bold">Recent payments</h1>
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectPayments />
        </ConnectComponentsProvider>
      </Container>
    </AuthenticatedAndOnboardedRoute>
  );
}
