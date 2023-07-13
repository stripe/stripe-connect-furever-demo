import React from 'react';
import {useQuery} from 'react-query';
import {StripeConnectInstance} from '@stripe/connect-js';
import {loadConnect} from '@stripe/connect-js';
import {ConnectComponentsProvider} from '@stripe/react-connect-js';
import {useSession} from './SessionProvider';
import {useColorMode} from './ColorModeProvider';
import {FullScreenLoading} from '../components/FullScreenLoading';
import {ErrorState} from '../components/ErrorState';
import useTheme from '@mui/system/useTheme';

type AccountSession = {
  clientSecret: string;
};

/**
 *  This function makes a server-side request to the /account_session.
 *  If there is an error, undefined is returned.
 *  Else, the clientSecret and publishableKey are returned.
 */
const fetchAccountSession = async (): Promise<AccountSession> => {
  const response = await fetch('/account_session', {
    method: 'POST',
  });
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(
      `Failed to obtain account session, could not initialize connect.js: ${responseJson.error}`
    );
  } else {
    const {client_secret: clientSecret} = responseJson;
    return {clientSecret};
  }
};

/**
 *  Since the claimed API key expires after a few hours, this will cause API calls
 *  to fail with a 401 unauthorized using an expired API key.
 *  This function makes a server-side request to the /account_session
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
const useInitStripeConnect = (
  enabled: boolean,
  appearance: Record<string, string>
) => {
  return useQuery<StripeConnectInstance, Error>(
    'initStripeConnect',
    async () => {
      const connect = await loadConnect();
      const {clientSecret} = await fetchAccountSession();
      const connectInstance = connect.initialize({
        clientSecret,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        refreshClientSecret,
        appearance,
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
  const theme = useTheme();
  const {mode} = useColorMode();
  const appearance = {
    // FurEver specifies a subset of the available options in ConnectJS
    colorPrimary: theme.palette.primary.main,
    colorText: theme.palette.text.primary,
    colorBackground: theme.palette.background.default,
    colorSecondaryText: theme.palette.text.secondary,
    colorSecondaryLinkText: theme.palette.secondary.main,
    colorBorder: theme.palette.border.main,
    colorFormHighlightBorder: theme.palette.primary.main,
    colorDanger: theme.palette.error.main,
    colorSecondaryButtonBackground: theme.palette.neutral100.main,
    colorSecondaryButtonBorder: theme.palette.border.main,
  } as Record<string, string>; // TODO: Remove casting once we've shipped theming options to beta

  // const {
  //   data: connectInstance,
  //   error,
  //   isLoading,
  //   refetch,
  // } = useInitStripeConnect(!!stripeAccount, appearance);

  // React.useEffect(() => {
  //   connectInstance?.update({
  //     appearance,
  //   });
  // }, [mode]);

  // if (!stripeAccount) return <>{children}</>;

  // if (error) {
  //   return <ErrorState errorMessage={error.message} retry={refetch} />;
  // }
  // if (!connectInstance || isLoading) return <FullScreenLoading />;

  return (
    // <ConnectComponentsProvider connectInstance={connectInstance}>
      <>{children}</>
    // </ConnectComponentsProvider>
  );
};
