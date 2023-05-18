import React from 'react';
import {useMutation} from 'react-query';
import {StripeConnectInstance} from '@stripe/connect-js';
import {loadConnect} from '@stripe/connect-js';
import {ConnectComponentsProvider} from '@stripe/react-connect-js';
import {useSession} from './SessionProvider';
import {FullScreenLoading} from '../components/FullScreenLoading';
import {ErrorState} from '../components/ErrorState';

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
const useInitStripeConnect = () => {
  return useMutation<StripeConnectInstance, Error>(
    'initStripeConnect',
    async () => {
      const connect = await loadConnect();
      const {clientSecret, publishableKey} = await fetchAccountSession();
      const connectInstance = connect.initialize({
        clientSecret,
        publishableKey,
        refreshClientSecret,
        appearance: {
          colorPrimary: '#228403',
        },
        uiConfig: {
          overlay: 'dialog',
        },
      });
      return connectInstance;
    }
  );
};

export const ConnectJsWrapper = ({children}: {children: React.ReactNode}) => {
  const {
    data: connectInstance,
    error,
    isLoading,
    mutate,
  } = useInitStripeConnect();
  const {stripeAccount} = useSession();

  React.useEffect(() => {
    const runAsync = async () => {
      if (stripeAccount) {
        mutate();
      }
    };
    runAsync();
  }, [stripeAccount]);

  if (!stripeAccount) return <>{children}</>;

  if (error) {
    return <ErrorState errorMessage={error.message} retry={mutate} />;
  }
  if (!connectInstance || isLoading) return <FullScreenLoading />;

  return (
    <ConnectComponentsProvider connectInstance={connectInstance}>
      {children}
    </ConnectComponentsProvider>
  );
};
