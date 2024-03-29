'use client';

import {ConnectIssuingCardsList} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function Finances() {
  return (
    <Container>
      <h1 className="text-lg font-bold mb-6">Cards</h1>
      <EmbeddedComponentContainer>
        <ConnectIssuingCardsList />
      </EmbeddedComponentContainer>
    </Container>
  );
}
