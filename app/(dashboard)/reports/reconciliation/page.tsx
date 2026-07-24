'use client';

import {ConnectPayoutReconciliationReport} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function PayoutReconciliation() {
  return (
    <Container>
      <EmbeddedComponentContainer
        componentName="PayoutReconciliationReport"
        isPreviewComponent
      >
        <ConnectPayoutReconciliationReport />
      </EmbeddedComponentContainer>
    </Container>
  );
}
