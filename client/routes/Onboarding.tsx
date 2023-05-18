import React from 'react';
import {useMutation} from 'react-query';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import {ConnectAccountOnboarding} from '@stripe/react-connect-js';
import {OnboardingFooter} from '../components/NoticeFooter';
import {EnableEmbeddedCheckbox} from '../components/EnableEmbeddedCheckbox';
import {EmbeddedComponentContainer} from '../components/EmbeddedComponentContainer';
import {useSession} from '../hooks/SessionProvider';

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

const Onboarding = () => {
  const {mutate} = useOnboarded();

  return (
    <>
      <Box className="container w-fill" sx={{gap: 4, marginBottom: 2}}>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
          }}
        >
          Onboard to Stripe
        </Typography>
        <Typography component={'div'} className="embedded-container" gap={2}>
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
          <stripe-connect-debug-utils></stripe-connect-debug-utils>
        </Typography>
      </Box>

      <OnboardingFooter />
    </>
  );
};

export default Onboarding;
