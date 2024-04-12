import React from 'react';
import {useMutation} from 'react-query';
import {useLocation, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {OnboardingFooter} from '../components/NoticeFooter';
import {EnableEmbeddedCheckbox} from '../components/EnableEmbeddedCheckbox';
import {
  EmbeddedComponentContainer,
  EmbeddedContainer,
} from '../components/EmbeddedComponentContainer';
import {useSession} from '../hooks/SessionProvider';
import {Container} from '../components/Container';
import {StripeConnectDebugUtils} from '../components/StripeConnectDebugUtils';
import {ConnectAccountOnboarding} from '../components/internal/ConnectJsPrivateComponents';

const useOnboarded = () => {
  const {refetch, stripeAccount} = useSession();
  const navigate = useNavigate();
  const {search} = useLocation();

  return useMutation<void, Error>('login', async () => {
    const response = await fetch('/onboarded', {
      method: 'GET',
    });
    const {onboarded} = await response.json();
    if (onboarded) {
      refetch();
      navigate(`/reservations${search}`);
    } else if (stripeAccount?.type !== 'custom') {
      navigate(0);
    }
  });
};

export const Onboarding = () => {
  const {search} = useLocation();
  const {mutate, error} = useOnboarded();
  const {stripeAccount} = useSession();
  const navigate = useNavigate();

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
        <EmbeddedContainer>
          <EnableEmbeddedCheckbox label="Enable embedded onboarding" />
          <EmbeddedComponentContainer>
            <ConnectAccountOnboarding
              privacyPolicyUrl="https://stripe.com/privacy?utm_campaign=vet"
              fullTermsOfServiceUrl="https://stripe.com/legal/connect-account?utm_campaign=vet"
              recipientTermsOfServiceUrl="https://stripe.com/legal/connect-account/recipient?utm_campaign=vet"
              onOnboardingExited={() => {
                console.log(
                  'Onboarding exited! We redirect the user to the next page...'
                );
                mutate();
                if (stripeAccount?.type === 'custom') {
                  navigate(`/bankaccountform${search}`);
                }
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
