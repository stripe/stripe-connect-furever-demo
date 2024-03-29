'use client';

import {useConnect} from '../../hooks/useConnect';

import {
  ConnectComponentsProvider,
  ConnectPayments,
} from '@stripe/react-connect-js';
import AuthenticatedAndOnboardedRoute from '@/app/components/AuthenticatedAndOnboardedRoute';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

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
          <EmbeddedComponentContainer>
            <ConnectPayments />
          </EmbeddedComponentContainer>
        </ConnectComponentsProvider>
      </Container>
    </AuthenticatedAndOnboardedRoute>
  );
}
