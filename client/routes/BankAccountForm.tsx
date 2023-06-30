import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {EmbeddedContainer} from '../components/EmbeddedComponentContainer';
import {Container} from '../components/Container';
import StripeConnectDebugUtils from '../components/StripeConnectDebugUtils';

const useCreateBankAccount = () => {
  return useMutation<void, Error>('createBankAccount', async () => {
    const response = await fetch('/create-bank-account', {
      method: 'POST',
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json?.error ?? 'An error ocurred, please try again.');
    }
  });
};

const BankAccountForm = () => {
  const {search} = useLocation();
  const navigate = useNavigate();
  const {status, mutate, isLoading, error} = useCreateBankAccount();

  React.useEffect(() => {
    if (status === 'success') {
      navigate(`/profile${search}`);
      navigate(0);
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
        <EmbeddedContainer>
          <Box>
            <Button onClick={() => mutate()} disabled={isLoading}>
              Add bank account
            </Button>
          </Box>
          <StripeConnectDebugUtils />
        </EmbeddedContainer>
        {status === 'error' && error?.message && (
          <Typography color="error" fontSize={14} sx={{textAlign: 'end'}}>
            {error.message}
          </Typography>
        )}
      </Container>
    </>
  );
};

export default BankAccountForm;
