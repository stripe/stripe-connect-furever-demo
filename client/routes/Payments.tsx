import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {ConnectPayments} from '@stripe/react-connect-js';
import {CardFooter} from '../components/CardFooter';
import {useSession} from '../hooks/SessionProvider';
import {TextInput, SelectInput} from '../components/FormInputs';
import {
  EmbeddedComponentContainer,
  EmbeddedContainer,
} from '../components/EmbeddedComponentContainer';
import {Container} from '../components/Container';
import {StripeConnectDebugUtils} from '../components/StripeConnectDebugUtils';
import {ConnectNotificationBanner} from '../components/internal/ConnectJsPrivateComponents';
import {staticCurrencyPaymentMethods} from '../../shared/staticCurrencies';

type FormValues = {
  count: string;
  amount: string;
  status: string;
  currency: string;
};

const useCreatePayments = () => {
  return useMutation<void, Error, FormValues>(
    'createPayments',
    async (formValues: FormValues) => {
      const response = await fetch('/create-payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const responseJson = await response.json();
        throw new Error(
          responseJson?.error ?? 'An error ocurred, please try again.'
        );
      }
    }
  );
};

const useCreateCheckoutSession = () => {
  return useMutation<void, Error, void>('createCheckoutSession', async () => {
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(
        responseJson?.error ?? 'An error ocurred, please try again.'
      );
    } else {
      const {checkoutSession} = responseJson;
      window.location.href = checkoutSession;
    }
  });
};

export const Payments = () => {
  const navigate = useNavigate();
  const {stripeAccount} = useSession();
  const {status, mutate: createPayment, isLoading, error} = useCreatePayments();
  const {mutate: createCheckoutSession} = useCreateCheckoutSession();
  const [formValues, setFormValues] = React.useState<FormValues>({
    count: '1',
    amount: '',
    status: 'card_successful',
    currency: '',
  });

  // Disables the currency selector when not using a successful payment status
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const {value} = event.target;
    if (value.startsWith('card_successful')) {
      setFormValues((prev) => ({...prev, status: value}));
    } else {
      setFormValues((prev) => ({...prev, currency: '', status: value}));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPayment(formValues);
  };

  const renderFooterTitle = () => {
    if (!stripeAccount?.details_submitted) {
      return 'Creating payments is disabled for this account. Please complete onboarding to enable payments.';
    } else if (!stripeAccount?.charges_enabled) {
      return 'Creating payments is disabled for this account. Please address the requirements in the notification banner to enable payments.';
    }
    return 'Create a test payment';
  };

  const renderFooter = () => {
    return (
      <CardFooter
        title={renderFooterTitle()}
        disabled={
          !stripeAccount?.charges_enabled || !stripeAccount?.details_submitted
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography variant="body2">
            Simulate a grooming session by using a testmode payment method to{' '}
            <Link
              href="https://stripe.com/docs/api/payment_intents"
              target="_blank"
              underline="none"
            >
              create a payment intent
            </Link>
            .
          </Typography>
          <Box
            boxShadow={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              paddingY: 0.5,
            }}
          >
            <TextInput
              label="Count"
              type="number"
              name="count"
              placeholder="Number of charges"
              inputProps={{
                min: '1',
                max: '10',
                pattern: 'd*',
              }}
              required
              size="small"
              value={formValues.count}
              onChange={(event) =>
                setFormValues((prev) => ({...prev, count: event.target.value}))
              }
            />
            <Divider />
            <TextInput
              label="Amount"
              type="number"
              name="amount"
              placeholder="If blank, a random amount is used"
              inputProps={{
                min: '1',
                max: '1000',
                pattern: 'd*',
              }}
              size="small"
              value={formValues.amount}
              onChange={(event) =>
                setFormValues((prev) => ({...prev, amount: event.target.value}))
              }
            />
            <Divider />
            <SelectInput
              label="Status"
              type="select"
              name="status"
              value={formValues.status}
              onChange={handleStatusChange}
              size="small"
            >
              <option value="card_successful">Successful</option>
              <option value="card_successful_intl">
                Successful (Non-US country)
              </option>
              <option value="card_disputed_fraudulent">
                Disputed (fraudulent)
              </option>
              <option value="card_disputed_product_not_received">
                Disputed (product not received)
              </option>
              <option value="card_disputed_inquiry">Disputed (inquiry)</option>
              <option value="card_uncaptured">Uncaptured</option>
              <option value="ach_direct_debit">ACH Direct Debit</option>
              <option value="sepa_debit">SEPA Direct Debit</option>
            </SelectInput>
            {!staticCurrencyPaymentMethods.includes(formValues.status) && (
              <>
                <Divider />
                <SelectInput
                  label="Currency"
                  type="select"
                  name="currency"
                  size="small"
                  value={formValues.currency}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      currency: event.target.value,
                    }))
                  }
                >
                  <option value="">Default</option>
                  <option value="aed">AED</option>
                  <option value="aud">AUD</option>
                  <option value="cad">CAD</option>
                  <option value="cny">CNY</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                  <option value="inr">INR</option>
                  <option value="jpy">JPY</option>
                  <option value="sgd">SGD</option>
                  <option value="usd">USD</option>
                </SelectInput>
              </>
            )}
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 1,
              marginLeft: 'auto',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: 'none',
                width: 'fit-content',
                fontWeight: 600,
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating' : 'Create test payments'}
            </Button>

            <Typography fontSize={14} sx={{textAlign: 'end'}}>
              Alternatively, use{' '}
              <Link
                href="https://stripe.com/docs/testing#cards"
                target="_blank"
                underline="none"
              >
                Stripe test cards
              </Link>{' '}
              to{' '}
              <Link
                underline="none"
                onClick={() => createCheckoutSession()}
                sx={{cursor: 'pointer'}}
              >
                create a payment with checkout
              </Link>
            </Typography>

            {status === 'success' && (
              <Typography color="success" fontSize={14} sx={{textAlign: 'end'}}>
                Payments successfully created!{' '}
                <Link
                  onClick={() => navigate(0)}
                  underline="none"
                  sx={{cursor: 'pointer'}}
                >
                  Reload the page
                </Link>{' '}
                to see the new payments.
              </Typography>
            )}
            {status === 'error' && error?.message && (
              <Typography color="error" fontSize={14} sx={{textAlign: 'end'}}>
                {error.message}
              </Typography>
            )}
          </Box>
        </Box>
      </CardFooter>
    );
  };
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
