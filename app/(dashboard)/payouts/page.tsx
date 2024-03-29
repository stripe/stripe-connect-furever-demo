'use client';

import {useConnect} from '@/app/hooks/useConnect';
import {
  ConnectComponentsProvider,
  ConnectPayouts,
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
      <h1 className="text-3xl font-bold">Payouts</h1>
      <Container>
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <EmbeddedComponentContainer>
            <ConnectPayouts />
          </EmbeddedComponentContainer>
        </ConnectComponentsProvider>
      </Container>
    </AuthenticatedAndOnboardedRoute>
  );
}
