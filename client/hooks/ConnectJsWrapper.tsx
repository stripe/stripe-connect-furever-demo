import React from 'react';
import {useQuery} from 'react-query';
import {
  StripeConnectInstance,
  loadConnectAndInitialize,
} from '@stripe/connect-js';
import {ConnectComponentsProvider} from '@stripe/react-connect-js';
import {ConnectJSProvider} from './ConnectJSProvider';
import {useSession} from './SessionProvider';
import {FullScreenLoading} from '../components/FullScreenLoading';
import {ErrorState} from '../components/ErrorState';
import useTheme from '@mui/system/useTheme';
import {Theme} from '@mui/system';

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

const fetchClientSecret = async () => {
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
      const connectInstance = loadConnectAndInitialize({
        fetchClientSecret,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        appearance,
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

  const calculateCurrentAppearance = (currentTheme: Theme) => {
    return {
      // FurEver specifies a subset of the available options in ConnectJS
      colorPrimary: currentTheme.palette.primary.main,
      colorText: currentTheme.palette.text.primary,
      colorBackground: currentTheme.palette.background.default,
      colorSecondaryText: currentTheme.palette.text.secondary,
      colorSecondaryLinkText: currentTheme.palette.secondary.main,
      colorBorder: currentTheme.palette.border.main,
      colorFormHighlightBorder: currentTheme.palette.primary.main,
      colorDanger: currentTheme.palette.error.main,
      colorSecondaryButtonBackground: currentTheme.palette.neutral100.main,
      colorSecondaryButtonBorder: currentTheme.palette.border.main,
    };
  };

  const {
    data: connectInstance,
    error,
    isLoading,
    refetch,
  } = useInitStripeConnect(!!stripeAccount, calculateCurrentAppearance(theme));

  React.useEffect(() => {
    connectInstance?.update({
      appearance: {variables: calculateCurrentAppearance(theme)},
    });
  }, [theme]);

  if (!stripeAccount) return <>{children}</>;

  if (error) {
    return <ErrorState errorMessage={error.message} retry={refetch} />;
  }
  if (!connectInstance || isLoading) return <FullScreenLoading />;

  return (
    <ConnectComponentsProvider connectInstance={connectInstance}>
      <ConnectJSProvider connectInstance={connectInstance}>
        {children}
      </ConnectJSProvider>
    </ConnectComponentsProvider>
  );
};
