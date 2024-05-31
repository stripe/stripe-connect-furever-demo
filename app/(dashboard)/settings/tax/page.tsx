'use client';

import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import {
  ConnectTaxSettings,
  ConnectTaxRegistrations,
} from '@stripe/react-connect-js';

export default function Tax() {
  return (
    <>
      <Container>
        <h1 className="text-xl font-semibold">Tax</h1>
        <p className="text-subdued">
          Configure these settings to automatically calculate and collect tax on
          your payments.
        </p>
        <EmbeddedComponentContainer>
          <ConnectTaxSettings />
        </EmbeddedComponentContainer>
      </Container>
      <Container>
        <h1 className="text-xl font-semibold">Tax registrations</h1>
        <p className="text-subdued">
          Locations where you have a registration, and want to collect taxes.
        </p>
        <EmbeddedComponentContainer>
          <ConnectTaxRegistrations />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
