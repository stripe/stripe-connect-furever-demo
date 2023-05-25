import React from 'react';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {ConnectAccountOnboarding} from '@stripe/react-connect-js';
import {OnboardingFooter} from '../components/NoticeFooter';
import {EnableEmbeddedCheckbox} from '../components/EnableEmbeddedCheckbox';
import {
  EmbeddedComponentContainer,
  EmbeddedContainer,
} from '../components/EmbeddedComponentContainer';
import {useSession} from '../hooks/SessionProvider';
import {Container} from '../components/Container';
import StripeConnectDebugUtils from '../components/StripeConnectDebugUtils';
import Stripe from 'stripe';

const useOnboarded = () => {
  const {refetch} = useSession();
  const navigate = useNavigate();
  return useMutation<void, Error>('login', async () => {
    const response = await fetch('/stripe/onboarded', {
      method: 'GET',
    });
    const {onboarded} = await response.json();
    if (onboarded) {
      refetch();
      navigate('/reservations');
    } else {
      navigate(0);
    }
  });
};

const goToOnboard = async (stripeAccount: Stripe.Account | null | undefined) => {
  const response = await fetch('/stripe/create-account-onboarding-link', {
    method: 'POST',
    body: JSON.stringify(stripeAccount)
  });
  const {url} = await response.json();
  location.href = url;
}

const Onboarding = () => {
  const {mutate, error} = useOnboarded();
  const {stripeAccount} = useSession();
  const isHostedOnboarding = stripeAccount?.type === 'express' || stripeAccount?.type === 'standard';
  return (
    <>
      <Container sx={{alignItems: 'center', gap: 4, marginBottom: 2}}>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
          }}
        >
          Onboard to Stripe
        </Typography>
        {isHostedOnboarding && <Button
            fullWidth
            variant="contained"
            onClick={() => {
              goToOnboard(stripeAccount);
            }}
            sx={{
              fontWeight: 700,
            }}
          >
            Onboard to Stripe
        </Button>}
        <EmbeddedContainer>
          <EnableEmbeddedCheckbox label="Enable embedded onboarding" />
          <EmbeddedComponentContainer>
            <ConnectAccountOnboarding
              onOnboardingExited={() => {
                console.log(
                  'Onboarding exited! We redirect the user to the next page...'
                );
                mutate();
              }}
            />
          </EmbeddedComponentContainer>
          <StripeConnectDebugUtils />
        </EmbeddedContainer>
        {error?.message && (
          <Typography variant="body2" color="error">
            {error.message}
          </Typography>
        )}
      </Container>

      <OnboardingFooter />
    </>
  );
};

export default Onboarding;
