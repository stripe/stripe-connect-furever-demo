import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useMutation} from 'react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import {useCreateComponent, useAttachAttribute} from '@stripe/react-connect-js';
import {useSession} from '../hooks/SessionProvider';
import {
  EmbeddedComponentContainer,
  EmbeddedContainer,
} from '../components/EmbeddedComponentContainer';
import {Container} from '../components/Container';
import {StripeConnectDebugUtils} from '../components/StripeConnectDebugUtils';
import {ConnectNotificationBanner} from '../components/internal/ConnectJsPrivateComponents';
import {CardFooter} from '../components/CardFooter';
import {stripe} from '../../server/routes/stripeSdk';

const useCreateReceivedCredit = () => {
  const {financialAccount} = useFinancialAccount();

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
  const [financialAccount, setFinancialAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/financial-account');
        const json = await response.json();
        setFinancialAccount(json.financial_account);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {loading, financialAccount, error};
};

const ConnectFinancialAccount = ({
  financialAccount,
}: {
  financialAccount: string;
}) => {
  const {wrapper, component: financialAccountComponent} = useCreateComponent(
    // @ts-ignore
    'stripe-connect-financial-account'
  );

  useAttachAttribute(
    financialAccountComponent,
    'financial-account',
    financialAccount
  );

  return wrapper;
};

const ConnectFinancialAccountTransactions = ({
  financialAccount,
}: {
  financialAccount: string;
}) => {
  const {wrapper, component: financialAccountTransactionsComponent} =
    useCreateComponent(
      // @ts-ignore
      'stripe-connect-financial-account-transactions'
    );

  useAttachAttribute(
    financialAccountTransactionsComponent,
    'financial-account',
    financialAccount
  );

  return wrapper;
};

const ConnectIssuingCardsList = () => {
  const {wrapper} = useCreateComponent(
    // @ts-ignore
    'stripe-connect-issuing-cards-list'
  );

  return wrapper;
};

export const Finance = () => {
  const {
    loading,
    financialAccount,
    error: useFinancialAccountError,
  } = useFinancialAccount();

  const navigate = useNavigate();
  const {stripeAccount} = useSession();

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

  if (!financialAccount || loading || useFinancialAccountError) {
    return null;
  }

  const disabled =
    !financialAccount || stripeAccount?.capabilities?.treasury !== 'active';

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
