import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import {
  ConnectNotificationBanner,
  ConnectPayouts,
} from '@stripe/react-connect-js';
import {CardFooter} from '../components/CardFooter';
import {useSession} from '../hooks/SessionProvider';
import {EmbeddedComponentContainer} from '../components/EmbeddedComponentContainer';

const useCreatePayout = () => {
  return useMutation<void, Error>('createPayout', async () => {
    const response = await fetch('/stripe/create-payout', {
      method: 'POST',
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json?.error ?? 'An error ocurred, please try again.');
    }
  });
};

const Payouts = () => {
  const navigate = useNavigate();
  const {stripeAccount} = useSession();
  const {status, mutate, isLoading, error} = useCreatePayout();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  React.useEffect(() => {
    if (status === 'success') {
      navigate(0);
    }
  }, [status]);

  const renderFooter = () => {
    if (!stripeAccount?.payouts_enabled || !stripeAccount?.details_submitted) {
      return null;
    }

    return (
      <CardFooter title="Create a test payout">
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
            Simulate a{' '}
            <Link
              href="https://stripe.com/docs/api/payouts"
              target="_blank"
              underline="none"
            >
              payout
            </Link>{' '}
            from your Stripe balance to your bank account.
          </Typography>

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
              {isLoading ? 'Creating' : 'Create test payout'}
            </Button>

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
      <Box className="container-start w-fill" sx={{gap: 4, marginBottom: 2}}>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
          }}
        >
          Payouts
        </Typography>
        <Typography component={'div'} className="embedded-container" gap={2}>
          <EmbeddedComponentContainer>
            <ConnectNotificationBanner />
          </EmbeddedComponentContainer>
          <EmbeddedComponentContainer>
            <ConnectPayouts />
          </EmbeddedComponentContainer>
          <stripe-connect-debug-utils></stripe-connect-debug-utils>
        </Typography>
      </Box>

      {renderFooter()}
    </>
  );
};

export default Payouts;
