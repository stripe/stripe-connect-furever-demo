import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {useMutation, useQuery} from 'react-query';
import {useTheme} from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import {
  ConnectFinancialAccount,
  ConnectFinancialAccountTransactions,
  ConnectIssuingCardsList,
  ConnectNotificationBanner,
} from '@stripe/react-connect-js';
import {useSession} from '../hooks/SessionProvider';
import {
  EmbeddedComponentContainer,
  EmbeddedContainer,
} from '../components/EmbeddedComponentContainer';
import {Container} from '../components/Container';
import {StripeConnectDebugUtils} from '../components/StripeConnectDebugUtils';
import {CardFooter} from '../components/CardFooter';
import {FullScreenLoading} from '../components/FullScreenLoading';
import {ErrorState} from '../components/ErrorState';
import {RequestCapabilities} from '../components/RequestCapabilities';

const useCreateReceivedCredit = () => {
  const {data: financialAccount} = useFinancialAccount();

  return useMutation<void, Error>('createReceivedCredit', async () => {
    const response = await fetch('/create-received-credit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        financial_account: financialAccount,
      }),
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json?.error ?? 'An error ocurred, please try again.');
    }
  });
};

const useFinancialAccount = () => {
  return useQuery<string, Error>('financialAccount', async () => {
    const response = await fetch('/financial-account');
    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new Error(
        jsonResponse?.error ?? 'An error ocurred, please try again.'
      );
    }
    return jsonResponse.financial_account;
  });
};

export const Finance = () => {
  const navigate = useNavigate();
  const {stripeAccount} = useSession();

  if (!stripeAccount || !stripeAccount.details_submitted) {
    return <div>To enable Finance, please complete onboarding.</div>;
  }

  const hasIssuingAndTreasury = ['card_issuing', 'treasury'].every(
    (capability) =>
      Object.keys(stripeAccount?.capabilities || []).includes(capability)
  );

  if (!hasIssuingAndTreasury) {
    return (
      <RequestCapabilities
        title={'Enable Finance'}
        description={
          'Click "Enable" to get started with a financial account and access to spend cards.'
        }
        capabilities={{
          card_issuing: {
            requested: true,
          },
          treasury: {
            requested: true,
          },
        }}
        onSuccess={async () => {
          await navigate('/onboarding');
          navigate(0);
        }}
      />
    );
  }

  const {
    data: financialAccount,
    isLoading: loading,
    error: useFinancialAccountError,
    refetch,
  } = useFinancialAccount();

  const {
    status,
    mutate,
    isLoading,
    error: useCreateReceivedCreditError,
  } = useCreateReceivedCredit();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  React.useEffect(() => {
    if (status === 'success') {
      navigate(0);
    }
  }, [status]);

  if (useFinancialAccountError) {
    return (
      <ErrorState
        errorMessage={useFinancialAccountError.message}
        retry={refetch}
      />
    );
  }
  if (loading || !financialAccount) return <FullScreenLoading />;

  const disabled = !financialAccount;

  const renderFooterTitle = () => {
    if (disabled) {
      return 'You need to create a financial account to enable finance features.';
    }
    return 'Create a test received credit';
  };

  const renderFooter = () => {
    return (
      <CardFooter title={renderFooterTitle()} disabled={disabled}>
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
              href="https://docs.stripe.com/api/treasury/received_credits"
              target="_blank"
              underline="none"
            >
              received credit
            </Link>{' '}
            from an external account to your FinancialAccount.
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
              {isLoading ? 'Creating' : 'Create received credit'}
            </Button>

            {status === 'error' && useCreateReceivedCreditError?.message && (
              <Typography color="error" fontSize={14} sx={{textAlign: 'end'}}>
                {useCreateReceivedCreditError.message}
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
          gap: 2,
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
          }}
        >
          Balance
        </Typography>
        <EmbeddedContainer>
          <EmbeddedComponentContainer>
            <ConnectNotificationBanner />
          </EmbeddedComponentContainer>
          <EmbeddedComponentContainer>
            <ConnectFinancialAccount financialAccount={financialAccount} />
          </EmbeddedComponentContainer>
          <EmbeddedComponentContainer>
            <ConnectFinancialAccountTransactions
              financialAccount={financialAccount}
            />
          </EmbeddedComponentContainer>
          <Typography
            variant="h5"
            sx={{
              marginTop: 4,
            }}
          >
            Cards
          </Typography>
          <EmbeddedComponentContainer>
            <ConnectIssuingCardsList />
          </EmbeddedComponentContainer>
          <StripeConnectDebugUtils />
        </EmbeddedContainer>
      </Container>

      {renderFooter()}
    </>
  );
};
