'use client';

import {useCreateComponent} from '@stripe/react-connect-js';
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
  return (
    <Container>
      <h1 className="text-lg font-bold mb-6">Loans</h1>
      <EmbeddedComponentContainer>
        <ConnectCapitalOverview />
      </EmbeddedComponentContainer>
    </Container>
  );
}
