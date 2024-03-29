import {useEffect, useMemo, useState} from 'react';
import {type StripeConnectInstance} from '@stripe/connect-js';
import {loadConnectAndInitialize} from '@stripe/connect-js';

export const useConnect = () => {
  const [hasError, setHasError] = useState(false);
  const [stripeConnectInstance, setStripeConnectInstance] =
    useState<StripeConnectInstance | null>(null);

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

      buttonSecondaryColorBackground: '#DEDDE1',

      badgeNeutralColorBackground: '#E4ECEC',
      badgeNeutralColorText: '#545969',
      badgeNeutralColorBorder: '#E4ECEC',

      badgeSuccessColorBackground: '#D4FCE8',
      badgeSuccessColorText: '#216142',
      badgeSuccessColorBorder: '#D4FCE8',

      // badgeErrorColorBackground: "#f26552",
      // badgeErrorColorText: "#ffffff",
      // badgeErrorColorBorder: "#f26552",

      badgeWarningColorBackground: '#FFEACC',
      badgeWarningColorText: '#F26552',
      badgeWarningColorBorder: '#FFEACC',
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
      });
    }
  }, [stripeConnectInstance, appearanceVariables]);

  useEffect(() => {
    const instance = loadConnectAndInitialize({
      // @ts-ignore
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
      fonts: [
        {
          src: `url(app/fonts/Sohne-Buch.otf)`,
          weight: '400',
          family: 'Sohne'
        },
        {
          src: `url(app/fonts/Sohne-Kraftig.otf)`,
          weight: '500',
          family: 'Sohne'
        },
        {
          src: `url(app/fonts/Sohne-Halbfett.otf)`,
          weight: '600',
          family: 'Sohne'
        },
      ],
      appearance: {
        overlays: 'dialog',
        variables: appearanceVariables,
      },
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
