'use client';

import {
  ConnectBalanceReport,
  ConnectPayoutReconciliationReport,
} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function Reports() {
  return (
    <>
      <header className="flex flex-col justify-between md:flex-row">
        <h1 className="text-3xl font-bold">Reports</h1>
      </header>
      <Container>
        <h2 className="text-xl font-bold">Balance summary report</h2>
        <EmbeddedComponentContainer componentName="BalanceReport">
          <ConnectBalanceReport />
        </EmbeddedComponentContainer>
      </Container>
      <Container>
        <h2 className="text-xl font-bold">Payout reconciliation report</h2>
        <EmbeddedComponentContainer componentName="PayoutReconciliationReport">
          <ConnectPayoutReconciliationReport />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
