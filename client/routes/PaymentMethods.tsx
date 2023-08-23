import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import {CardFooter} from '../components/CardFooter';
import {Container} from '../components/Container';
import {LaunchCheckoutForm} from '../components/CreateCheckoutSessionForm';
import {
  EmbeddedComponentContainer,
  EmbeddedContainer,
} from '../components/EmbeddedComponentContainer';
import {StripeConnectDebugUtils} from '../components/StripeConnectDebugUtils';
import {ConnectPaymentMethodSettings} from '../components/internal/ConnectJsPrivateComponents';
import {useSession} from '../hooks/SessionProvider';

export const PaymentMethods = () => {
  const {stripeAccount} = useSession();

  const renderFooter = () => {
    return (
      <CardFooter
        title="Create a test payment"
        disabled={
          !stripeAccount?.charges_enabled || !stripeAccount?.details_submitted
        }
      >
        <LaunchCheckoutForm
          description={
            <>
              <Typography variant="body2">
                Launch a Checkout session where customers can pay with{' '}
                <Link
                  href="https://stripe.com/docs/testing#cards"
                  target="_blank"
                  underline="none"
                >
                  Stripe test cards
                </Link>{' '}
                or one of the local payment methods that you have enabled here.
                View your completed payments on the{' '}
                <Link href="/payments" target="_blank" underline="none">
                  Payments
                </Link>{' '}
                page.
              </Typography>

              <Typography variant="body2">
                Some payment methods are only offered in certain currencies or
                with a minimum payment amount.{' '}
                <Link
                  href="https://stripe.com/docs/payments/payment-methods/integration-options#country-currency-support"
                  target="_blank"
                  underline="none"
                >
                  Learn more
                </Link>
              </Typography>
            </>
          }
        />
      </CardFooter>
    );
  };

  return (
    <>
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
          Payment Methods
        </Typography>
        <EmbeddedContainer>
          <EmbeddedComponentContainer>
            <ConnectPaymentMethodSettings />
          </EmbeddedComponentContainer>
          <StripeConnectDebugUtils />
        </EmbeddedContainer>
      </Container>

      {renderFooter()}
    </>
  );
};
