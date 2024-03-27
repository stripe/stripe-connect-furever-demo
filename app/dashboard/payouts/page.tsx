'use client';

import {useConnect} from '../../hooks/useConnect';
import {
  ConnectComponentsProvider,
  ConnectPayouts,
} from '@stripe/react-connect-js';
import AuthenticatedAndOnboardedRoute from '../../components/AuthenticatedAndOnboardedRoute';
import Container from '../../components/Container';

export default function Payouts() {
  const {hasError, stripeConnectInstance} = useConnect();

  if (hasError || !stripeConnectInstance) {
    return null;
  }

  return (
    <AuthenticatedAndOnboardedRoute>
      <h1 className="text-3xl font-bold">Payouts</h1>
      <Container>
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectPayouts />
        </ConnectComponentsProvider>
      </Container>
    </AuthenticatedAndOnboardedRoute>
  );
}
