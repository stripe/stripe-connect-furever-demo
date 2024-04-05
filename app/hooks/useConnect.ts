import {useEffect, useMemo, useState, useContext} from 'react';
import {type StripeConnectInstance} from '@stripe/connect-js';
import {loadConnectAndInitialize} from '@stripe/connect-js';
import {useSettings} from '@/app/hooks/useSettings';

export const useConnect = () => {
  const [hasError, setHasError] = useState(false);
  const [stripeConnectInstance, setStripeConnectInstance] =
    useState<StripeConnectInstance | null>(null);

  const settings = useSettings();
  console.log(settings);

  const fetchClientSecret = async () => {
    // Fetch the AccountSession client secret
    const response = await fetch('/api/account_session', {
      method: 'POST',
    });
    if (!response.ok) {
      // Handle errors on the client side here
      const {error} = await response.json();
      console.log('An error occurred: ', error);
      setHasError(true);
      return undefined;
    } else {
      const {client_secret: clientSecret} = await response.json();
      setHasError(false);
      return clientSecret;
    }
  };

  const appearanceVariables = useMemo(
    () => ({
      fontFamily: 'Sohne, inherit',

      colorPrimary: '#F26552',

      buttonPrimaryColorText: '#FFFFFF',

      badgeSuccessColorBackground: '#D7F4CC',
      badgeSuccessColorText: '#264F47',
      badgeSuccessColorBorder: '#BDDAB3',

      badgeWarningColorBackground: '#FFEACC',
      badgeWarningColorText: '#C95B4D',
      badgeWarningColorBorder: '#FFD28C',

      badgeDangerColorBackground: '#FFEACC',
      badgeDangerColorText: '#C95B4D',
      badgeDangerColorBorder: '#FFD28C',
    }),
    []
  );

  useEffect(() => {
    if (stripeConnectInstance) {
      stripeConnectInstance.update({
        appearance: {
          overlays: 'dialog',
          variables: appearanceVariables,
        },
        // @ts-ignore
        locale: settings.locale,
      });
    }
  }, [stripeConnectInstance, appearanceVariables, settings]);

  useEffect(() => {
    const instance = loadConnectAndInitialize({
      // @ts-ignore
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
      appearance: {
        overlays: 'dialog',
        variables: appearanceVariables,
      },
      // @ts-ignore
      locale: settings.locale,
      fetchClientSecret: async () => {
        return await fetchClientSecret();
      },
    });

    setStripeConnectInstance(instance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    hasError,
    stripeConnectInstance,
  };
};
