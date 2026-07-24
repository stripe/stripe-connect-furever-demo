'use client';

import {ConnectBalanceReport} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function BalanceReport() {
  return (
    <Container>
      <EmbeddedComponentContainer
        componentName="BalanceReport"
        isPreviewComponent
      >
        <ConnectBalanceReport />
      </EmbeddedComponentContainer>
    </Container>
  );
}
