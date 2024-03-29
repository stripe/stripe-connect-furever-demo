'use client';

import {useConnect} from '@/app/hooks/useConnect';
import {
  ConnectComponentsProvider,
  useCreateComponent,
} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

const ConnectCapitalOverview = () => {
  const {wrapper} = useCreateComponent(
    // @ts-ignore
    'stripe-connect-capital-overview'
  );

  return wrapper;
};

export default function Finances() {
  const {hasError, stripeConnectInstance} = useConnect();
  if (hasError || !stripeConnectInstance) {
    return null;
  }

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <Container>
        <h1 className="text-lg font-bold mb-6">Loans</h1>
        <EmbeddedComponentContainer>
          <ConnectCapitalOverview />
        </EmbeddedComponentContainer>
      </Container>
    </ConnectComponentsProvider>
  );
}
