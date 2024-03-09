import React from 'react';

import {useMutation} from 'react-query';

import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import {staticCurrencyPaymentMethods} from '../../shared/staticCurrencies';

import {CurrencySelectInput} from './CurrencySelectInput';
import {AmountInput} from './AmountInput';
import {Link, Typography} from '@mui/material';
import {SelectInput, TextInput} from './FormInputs';
import {useNavigate} from 'react-router-dom';

export type FormValues = {
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

export const CreatePaymentsForm = () => {
  const [formValues, setFormValues] = React.useState<FormValues>({
    count: '1',
    amount: '',
    status: 'card_successful',
    currency: '',
  });

  const navigate = useNavigate();

  const {status, mutate: createPayment, isLoading, error} = useCreatePayments();

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
        createPayment(formValues);
      }}
    >
      <Typography variant="body2">
        Simulate an appointment by using a testmode payment method to{' '}
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
        <AmountInput
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
            <CurrencySelectInput
              value={formValues.currency}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  currency: event.target.value,
                }))
              }
            />
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
  );
};
