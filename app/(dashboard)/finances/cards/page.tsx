'use client';

import {useConnect} from '@/app/hooks/useConnect';
import {
  ConnectComponentsProvider,
  ConnectIssuingCardsList,
} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function Finances() {
  const {hasError, stripeConnectInstance} = useConnect();
  if (hasError || !stripeConnectInstance) {
    return null;
  }

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <Container>
        <h1 className="text-lg font-bold mb-6">Cards</h1>
        <EmbeddedComponentContainer>
          <ConnectIssuingCardsList />
        </EmbeddedComponentContainer>
      </Container>
    </ConnectComponentsProvider>
  );
}
