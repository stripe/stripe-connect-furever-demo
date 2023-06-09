import React from 'react';
import {useNavigate} from 'react-router-dom';
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

const Onboarding = () => {
  const {refetch} = useSession();
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
              onOnboardingExited={() => {
                console.log(
                  'Onboarding exited! We redirect the user to the next page...'
                );

                // Redirect user and refresh session once Connect onboarding is completed
                refetch();
                navigate('/reservations');
              }}
            />
          </EmbeddedComponentContainer>
          <StripeConnectDebugUtils />
        </EmbeddedContainer>
      </Container>

      <OnboardingFooter />
    </>
  );
};

export default Onboarding;
