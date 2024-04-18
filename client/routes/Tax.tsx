import React from 'react';

import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {
  ConnectTaxSettings,
  ConnectTaxRegistrations,
} from '../components/internal/ConnectJsPrivateComponents';
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
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        Tax
      </Typography>
      <StripeConnectDebugUtils />
      <EmbeddedContainer>
        <EmbeddedComponentContainer>
          <ConnectTaxSettings />
        </EmbeddedComponentContainer>
        <EmbeddedComponentContainer>
          <ConnectTaxRegistrations />
        </EmbeddedComponentContainer>
      </EmbeddedContainer>
    </Container>
  );
};
