import React from 'react';
import {useNavigate} from 'react-router-dom';
import {
  ConnectAccountManagement,
  ConnectNotificationBanner,
} from '@stripe/react-connect-js';
import {useMutation} from 'react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {ProfileInformation} from '../components/ProfileInformation';
import {CardFooter} from '../components/CardFooter';
import {useSession} from '../hooks/SessionProvider';
import {EnableEmbeddedCheckbox} from '../components/EnableEmbeddedCheckbox';
import {
  EmbeddedComponentContainer,
  EmbeddedContainer,
} from '../components/EmbeddedComponentContainer';
import {Container} from '../components/Container';
import StripeConnectDebugUtils from '../components/StripeConnectDebugUtils';

const useCreateIntervention = () => {
  return useMutation<void, Error>('createIntervention', async () => {
    const response = await fetch('/stripe/create-intervention', {
      method: 'POST',
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json?.error ?? 'An error ocurred, please try again.');
    }
  });
};

const Profile = ({user}: {user: Express.User}) => {
  const navigate = useNavigate();
  const {stripeAccount} = useSession();
  const {status, mutate, isLoading, error} = useCreateIntervention();

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
      <CardFooter title="Create a test notification">
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
            Simulate a scenario where Stripe requests more information from the
            business.
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
              {isLoading ? 'Creating' : 'Create test notification'}
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
      <Container
        sx={{
          gap: 4,
          marginBottom: 2,
        }}
      >
        <ProfileInformation user={user} />
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
          }}
        >
          Stripe settings
        </Typography>
        <EmbeddedContainer>
          <EnableEmbeddedCheckbox label="Enable embedded account management" />
          <EmbeddedComponentContainer>
            <ConnectNotificationBanner />
          </EmbeddedComponentContainer>
          <EmbeddedComponentContainer>
            <ConnectAccountManagement />
          </EmbeddedComponentContainer>
          <StripeConnectDebugUtils />
        </EmbeddedContainer>
      </Container>

      {renderFooter()}
    </>
  );
};

export default Profile;
