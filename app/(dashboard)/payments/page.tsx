'use client';

import {ConnectPayments} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function Payouts() {
  return (
    <>
      <h1 className="text-3xl font-bold">Payments</h1>
      <Container>
        <h1 className="text-lg font-bold">Recent payments</h1>
        <EmbeddedComponentContainer>
          <ConnectPayments />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
