'use client';

import {ConnectPayouts} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function Payouts() {
  return (
    <>
      <h1 className="text-3xl font-bold">Payouts</h1>
      <Container>
        <EmbeddedComponentContainer>
          <ConnectPayouts />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
