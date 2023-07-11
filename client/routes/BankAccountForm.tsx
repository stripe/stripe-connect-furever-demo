import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import Box from '@mui/material/Box';
import Typography, {TypographyProps} from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {EmbeddedContainer} from '../components/EmbeddedComponentContainer';
import {Container} from '../components/Container';
import StripeConnectDebugUtils from '../components/StripeConnectDebugUtils';
import {Divider, FormGroup, Link, styled} from '@mui/material';
import {TextInput} from '../components/FormInputs';

type FormValues = {
  account_number: string;
  routing_number: string;
  account_holder_type: string;
  account_holder_name: string;
  currency: string;
  country: string;
};

const StyledTypography = styled(Typography)(() => ({
  textTransform: 'uppercase',
  fontWeight: 500,
}));

const FormBlockHeader = (props: TypographyProps) => (
  <StyledTypography color="text.secondary" {...props} />
);

const useCreateBankAccount = () => {
  return useMutation<void, Error, FormValues>(
    'createBankAccount',
    async (formValues: FormValues) => {
      const response = await fetch('/create-bank-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formValues,
        }),
      });
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json?.error ?? 'An error ocurred, please try again.');
      }
    }
  );
};

const BankAccountForm = () => {
  const {search} = useLocation();
  const navigate = useNavigate();
  const {status, mutate, isLoading, error} = useCreateBankAccount();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formValues);
  };
  const [formValues, setFormValues] = React.useState<FormValues>({
    account_number: '',
    routing_number: '',
    account_holder_type: '',
    account_holder_name: '',
    currency: '',
    country: '',
  });

  React.useEffect(() => {
    if (status === 'success') {
      navigate(`/profile${search}`);
    }
  }, [status]);

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
          Add bank account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is an example of a form the platform can use to collect bank
          account information. Test bank account numbers can be found{' '}
          <Link
            href="https://stripe.com/docs/testing#non-card-payments"
            target="_blank"
            underline="none"
          >
            here
          </Link>{' '}
        </Typography>
        <EmbeddedContainer>
          <Box component="form" onSubmit={handleSubmit}>
            <FormBlockHeader>Account information</FormBlockHeader>
            <FormGroup>
              <TextInput
                label="Account holder name"
                name="Account holder name"
                placeholder="Jane Doe"
                required
                value={formValues.account_holder_name}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    account_holder_name: event.target.value,
                  }))
                }
              />
              <Divider />
              <TextInput
                label="Account holder type"
                name="Account holder type"
                placeholder="individual"
                required
                value={formValues.account_holder_type}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    account_holder_type: event.target.value,
                  }))
                }
              />
              <Divider />
              <TextInput
                label="Country"
                name="country"
                placeholder="US"
                required
                value={formValues.country}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    country: event.target.value,
                  }))
                }
              />
              <Divider />
              <TextInput
                label="Currency"
                name="Currency"
                placeholder="usd"
                required
                value={formValues.currency}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    currency: event.target.value,
                  }))
                }
              />
              <Divider />
              <TextInput
                label="Routing number"
                name="Routing number"
                placeholder="110000000"
                required
                value={formValues.routing_number}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    routing_number: event.target.value,
                  }))
                }
              />
              <Divider />
              <TextInput
                label="Account number"
                name="Account number"
                placeholder="000123456789"
                required
                value={formValues.account_number}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    account_number: event.target.value,
                  }))
                }
              />
            </FormGroup>
            <Container
              sx={{
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2, fontWeight: 700}}
                disabled={isLoading}
              >
                Add bank account
              </Button>
              {error?.message && (
                <Typography variant="body2" color="error">
                  {error.message}
                </Typography>
              )}
            </Container>
          </Box>
          <StripeConnectDebugUtils />
        </EmbeddedContainer>
      </Container>
    </>
  );
};

export default BankAccountForm;
