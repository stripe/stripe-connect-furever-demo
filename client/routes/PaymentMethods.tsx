import React from 'react';
import Typography from '@mui/material/Typography';
import {
  EmbeddedComponentContainer,
  EmbeddedContainer,
} from '../components/EmbeddedComponentContainer';
import {Container} from '../components/Container';
import {StripeConnectDebugUtils} from '../components/StripeConnectDebugUtils';

export const PaymentMethodSettings = () => {
  return (
    <>
      <Container
        sx={{
          gap: 4,
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
          }}
        >
          Payment Methods
        </Typography>
        <EmbeddedContainer>
          <EmbeddedComponentContainer>
            {/* TODO convert to the <ConnectPaymentMethodSettings /> component once it is launched */}
            {/* @ts-ignore-next-line */}
            <stripe-connect-payment-method-settings></stripe-connect-payment-method-settings>
          </EmbeddedComponentContainer>
          <StripeConnectDebugUtils />
        </EmbeddedContainer>
      </Container>
    </>
  );
};
