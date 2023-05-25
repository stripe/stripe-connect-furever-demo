import React from 'react';
import {useQuery} from 'react-query';
import {StripeConnectInstance} from '@stripe/connect-js';
import {loadConnect} from '@stripe/connect-js';
import {ConnectComponentsProvider} from '@stripe/react-connect-js';
import {useSession} from './SessionProvider';
import {FullScreenLoading} from '../components/FullScreenLoading';
import {ErrorState} from '../components/ErrorState';
import {useTheme} from '@mui/material/styles';

type AccountSession = {
  clientSecret: string;
  publishableKey: string;
};

/**
 *  This function makes a server-side request to the /stripe/create-account-session.
 *  If there is an error, undefined is returned.
 *  Else, the clientSecret and publishableKey are returned.
 */
const fetchAccountSession = async (): Promise<AccountSession> => {
  const response = await fetch('/stripe/create-account-session', {
    method: 'POST',
  });
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(
      `Failed to obtain account session, could not initialize connect.js: ${responseJson.error}`
    );
  } else {
    const {client_secret: clientSecret, publishable_key: publishableKey} =
      responseJson;
    return {clientSecret, publishableKey};
  }
};

/**
 *  Since the claimed API key expires after a few hours, this will cause API calls
 *  to fail with a 401 unauthorized using an expired API key.
 *  This function makes a server-side request to the /stripe/create-account-session
 *  and returns a new clientSecret in order to claim a new API key.
 */
const refreshClientSecret = async () => {
  const {clientSecret} = await fetchAccountSession();
  return clientSecret;
};

/**
 *  This function calls the fetchAccountSession function and
 *  uses the retrieved clientSecret to initialize the Connect.js instance.
 */
const useInitStripeConnect = (enabled: boolean) => {
  const theme = useTheme();

  return useQuery<StripeConnectInstance, Error>(
    'initStripeConnect',
    async () => {
      const connect = await loadConnect();
      const {clientSecret, publishableKey} = await fetchAccountSession();
      const connectInstance = connect.initialize({
        clientSecret,
        publishableKey,
        refreshClientSecret,
        appearance: {
          colorPrimary: theme.palette.primary.main,
          colorText: theme.palette.text.primary,
          colorSecondaryText: theme.palette.text.secondary,
          colorSecondaryLinkText: theme.palette.secondary.main,
          colorBorder: theme.palette.divider,
          colorFormHighlight: theme.palette.primary.main,
          colorFeedbackSuccess: theme.palette.success.main,
          colorFeedbackCritical: theme.palette.error.main,
        },
        uiConfig: {
          overlay: 'dialog',
        },
      });
      return connectInstance;
    },
    {
      enabled,
      refetchOnWindowFocus: false,
    }
  );
};

export const ConnectJsWrapper = ({children}: {children: React.ReactNode}) => {
  const {stripeAccount} = useSession();
  const {
    data: connectInstance,
    error,
    isLoading,
    refetch,
  } = useInitStripeConnect(!!stripeAccount);

  if (!stripeAccount) return <>{children}</>;

  if (error) {
    return <ErrorState errorMessage={error.message} retry={refetch} />;
  }
  if (!connectInstance || isLoading) return <FullScreenLoading />;

  return (
    <ConnectComponentsProvider connectInstance={connectInstance}>
      {children}
    </ConnectComponentsProvider>
  );
};
