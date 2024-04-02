'use client';

import {ConnectIssuingCardsList} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function Finances() {
  return (
    <Container>
      <h1 className="mb-1 text-lg font-bold">Cards</h1>
      <EmbeddedComponentContainer>
        <ConnectIssuingCardsList />
      </EmbeddedComponentContainer>
    </Container>
  );
}
