import React from 'react';

import Typography from '@mui/material/Typography';
import {
  ConnectTaxSettings,
  ConnectTaxRegistrations,
} from '@stripe/react-connect-js';
import {useSession} from '../hooks/SessionProvider';
import {
  EmbeddedComponentContainer,
  EmbeddedContainer,
} from '../components/EmbeddedComponentContainer';
import {Container} from '../components/Container';
import {StripeConnectDebugUtils} from '../components/StripeConnectDebugUtils';

export const Tax = () => {
  const {stripeAccount} = useSession();
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Container
      sx={{
        gap: 2,
        marginBottom: 2,
      }}
    >
      <StripeConnectDebugUtils />
      <EmbeddedContainer>
        <Typography variant="h5">Tax settings</Typography>
        <EmbeddedComponentContainer>
          <ConnectTaxSettings />
        </EmbeddedComponentContainer>
        <Typography variant="h5">Tax registrations</Typography>
        <EmbeddedComponentContainer>
          <ConnectTaxRegistrations />
        </EmbeddedComponentContainer>
      </EmbeddedContainer>
    </Container>
  );
};
