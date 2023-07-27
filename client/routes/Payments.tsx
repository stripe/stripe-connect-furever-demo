import React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import {ConnectPayments} from '@stripe/react-connect-js';
import {CardFooter} from '../components/CardFooter';
import {useSession} from '../hooks/SessionProvider';
import {
  EmbeddedComponentContainer,
  EmbeddedContainer,
} from '../components/EmbeddedComponentContainer';
import {Container} from '../components/Container';
import {StripeConnectDebugUtils} from '../components/StripeConnectDebugUtils';
import {ConnectNotificationBanner} from '../components/internal/ConnectJsPrivateComponents';
import {CreatePaymentsForm} from '../components/CreatePaymentsForm';
import {LaunchCheckoutForm} from '../components/CreateCheckoutSessionForm';

export const Payments = () => {
  const {stripeAccount} = useSession();
  const [tabIndex, setTabIndex] = React.useState(0);

  const renderFooterTitle = () => {
    if (!stripeAccount?.details_submitted) {
      return 'Creating payments is disabled for this account. Please complete onboarding to enable payments.';
    } else if (!stripeAccount?.charges_enabled) {
      return 'Creating payments is disabled for this account. Please address the requirements in the notification banner to enable payments.';
    }
    return 'Create a test payment';
  };

  const TabPanel = ({
    index,
    children,
  }: React.PropsWithChildren<{index: number}>) =>
    index === tabIndex ? (
      <Box sx={{minHeight: undefined}}>
        <Typography>{children}</Typography>
      </Box>
    ) : null;

  const renderFooter = () => {
    return (
      <CardFooter
        title={renderFooterTitle()}
        disabled={
          !stripeAccount?.charges_enabled || !stripeAccount?.details_submitted
        }
      >
        <Box sx={{borderBottom: 1, borderColor: 'divider', marginBottom: 1}}>
          <Tabs
            value={tabIndex}
            onChange={(event, newIndex) => setTabIndex(newIndex)}
            variant="fullWidth"
          >
            <Tab wrapped label="Using Payment Intent" />
            <Tab wrapped label="Using Checkout" />
          </Tabs>
        </Box>
        <TabPanel index={0}>
          <CreatePaymentsForm />
        </TabPanel>
        <TabPanel index={1}>
          <LaunchCheckoutForm
            description={
              <>
                <Typography variant="body2">
                  Collect payment for a grooming session using Checkout. The
                  customer can pay with{' '}
                  <Link
                    href="https://stripe.com/docs/testing#cards"
                    target="_blank"
                    underline="none"
                  >
                    Stripe test cards
                  </Link>{' '}
                  or one of the local payment methods that you have enabled on
                  the{' '}
                  <Link
                    href="/payment-methods"
                    target="_blank"
                    underline="none"
                  >
                    Payment Methods
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
        </TabPanel>
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
          Payments
        </Typography>
        <EmbeddedContainer>
          <EmbeddedComponentContainer>
            <ConnectNotificationBanner />
          </EmbeddedComponentContainer>
          <EmbeddedComponentContainer>
            <ConnectPayments />
          </EmbeddedComponentContainer>
          <StripeConnectDebugUtils />
        </EmbeddedContainer>
      </Container>

      {renderFooter()}
    </>
  );
};
