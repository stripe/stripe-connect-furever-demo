import React from 'react';
import {useMutation} from 'react-query';
import {StripeConnectInstance} from '@stripe/connect-js';
import {loadConnect} from '@stripe/connect-js';
import {ConnectComponentsProvider} from '@stripe/react-connect-js';
import {useSession} from './SessionProvider';
import {FullScreenLoading} from '../components/FullScreenLoading';

const connect = await loadConnect();

type AccountSession = {
  clientSecret: string;
  publishableKey: string;
};

/**
 *  This function makes a server-side request to the /stripe/create-account-session.
 *  If there is an error, undefined is returned.
 *  Else, the clientSecret and publishableKey are returned.
 */
const useCreateAccountSession = () => {
  return useMutation<AccountSession, Error, void>('createAccountSession', () =>
    fetch('/stripe/create-account-session', {
      method: 'POST',
    }).then(async (response) => {
      const json = await response.json();
      if (!response.ok) {
        const {error} = json;
        throw new Error(error.message);
      } else {
        const {client_secret: clientSecret, publishable_key: publishableKey} =
          json;
        return {clientSecret, publishableKey};
      }
    })
  );
};

/**
 *  Since the claimed API key expires after a few hours, this will cause API calls
 *  to fail with a 401 unauthorized using an expired API key.
 *  This function makes a server-side request to the /stripe/create-account-session
 *  and returns a new clientSecret in order to claim a new API key.
 */
const useFetchClientSecret = () => async () => {
  const {mutateAsync: createAccountSession} = useCreateAccountSession();
  try {
    const {clientSecret} = await createAccountSession();
    return clientSecret;
  } catch (error: any) {
    console.error(
      'Failed to obtain account session, could not initialize connect.js: ',
      error
    );
    return '';
  }
};

export const ConnectJsWrapper = ({children}: {children: React.ReactNode}) => {
  const {mutateAsync: createAccountSession, mutate} = useCreateAccountSession();
  const {stripeAccount} = useSession();
  const [connectInstance, setConnectInstance] =
    React.useState<StripeConnectInstance | null>();
  const refreshClientSecret = useFetchClientSecret();

  React.useEffect(() => {
    const runAsync = async () => {
      try {
        if (stripeAccount) {
          const accountSession = await createAccountSession();

          const connectInstance = connect.initialize({
            clientSecret: accountSession?.clientSecret,
            publishableKey: accountSession?.publishableKey,
            refreshClientSecret,
            appearance: {
              colorPrimary: '#228403',
            },
            uiConfig: {
              overlay: 'dialog',
            },
          });
          setConnectInstance(connectInstance);
        }
      } catch (error: any) {
        console.error(
          'Failed to obtain account session, could not initialize connect.js: ',
          error
        );
      }
    };
    runAsync();
  }, [stripeAccount]);

  if (!stripeAccount) return <>{children}</>;

  if (!connectInstance) return <FullScreenLoading />;
  return (
    <ConnectComponentsProvider connectInstance={connectInstance}>
      {children}
    </ConnectComponentsProvider>
  );
};
