import React from 'react';

import {useMutation} from 'react-query';

import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import CurrencySelectInput from './CurrencySelectInput';
import AmountInput from './AmountInput';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const useCreateCheckoutSession = () => {
  return useMutation<void, Error, PostValues>(
    'createCheckoutSession',
    async (postValues: PostValues) => {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postValues),
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
    }
  );
};

type FormValues = {
  currency: string;
  amount: string;
};

type PostValues = FormValues & {
  redirectUrl: string;
};

type Props = {
  description?: React.ReactNode;
};

const LaunchCheckoutForm = ({description}: Props) => {
  const [formValues, setFormValues] = React.useState<FormValues>({
    amount: '',
    currency: '',
  });

  const {
    status,
    mutate: createCheckoutSession,
    isLoading,
    error,
  } = useCreateCheckoutSession();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        createCheckoutSession({
          ...formValues,
          redirectUrl: window.location.href,
        });
      }}
    >
      {description}
      <Box
        boxShadow={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          paddingY: 0.5,
        }}
      >
        <AmountInput
          value={formValues.amount}
          onChange={(event) =>
            setFormValues((prev) => ({...prev, amount: event.target.value}))
          }
        />
        <Divider />
        <CurrencySelectInput
          value={formValues.currency}
          onChange={(event) =>
            setFormValues({...formValues, currency: event.target.value})
          }
        />
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
          sx={{textTransform: 'none', width: 'fit-content', fontWeight: 600}}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Checkout session' : 'Create Checkout session'}
        </Button>

        {status === 'error' && error?.message && (
          <Typography color="error" fontSize={14} sx={{textAlign: 'end'}}>
            {error.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LaunchCheckoutForm;
