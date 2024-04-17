import {useEffect, useMemo, useState, useCallback} from 'react';
import {type StripeConnectInstance} from '@stripe/connect-js';
import {loadConnectAndInitialize} from '@stripe/connect-js';
import {useSettings} from '@/app/hooks/useSettings';

export const useConnect = (demoOnboarding: boolean) => {
  const [hasError, setHasError] = useState(false);
  const [stripeConnectInstance, setStripeConnectInstance] =
    useState<StripeConnectInstance | null>(null);

  const settings = useSettings();
  const locale = settings.locale;

  const [localLocale, setLocalLocale] = useState(settings.locale);

  useEffect(() => {
    if (locale === localLocale) {
      return;
    }

    let newAccountSessionRequired: boolean = false;

    switch (locale) {
      case 'fr-FR':
        newAccountSessionRequired = true;
        break;
      case 'zh-Hant-HK':
      case 'en-GB':
        if (localLocale === 'zh-Hant-HK' || localLocale === 'en-GB') {
          // No need to get a new account session here
        } else {
          newAccountSessionRequired = true;
        }
        break;
      default:
        if (['fr-FR', 'zh-Hant-HK', 'en-GB'].includes(localLocale)) {
          // We need a new account session
          newAccountSessionRequired = true;
        }

        break;
    }

    if (locale !== localLocale) {
      setLocalLocale(locale);
    }

    if (demoOnboarding && newAccountSessionRequired) {
      setStripeConnectInstance(null);
    }
  }, [locale, localLocale, demoOnboarding]);

  const fetchClientSecret = useCallback(async () => {
    if (demoOnboarding) {
      console.log('Fetching client secret for demo onboarding');
    }
    const data = demoOnboarding
      ? {
          demoOnboarding: true,
          locale,
        }
      : {};

    // Fetch the AccountSession client secret
    const response = await fetch('/api/account_session', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // Handle errors on the client side here
      const {error} = await response.json();
      console.warn('An error occurred: ', error);
      setHasError(true);
      return undefined;
    } else {
      const {client_secret: clientSecret} = await response.json();
      setHasError(false);
      return clientSecret;
    }
  }, [demoOnboarding, locale]);

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
    // If we are demoing onboarding, re-init to get a new secret
    if (stripeConnectInstance) {
      stripeConnectInstance.update({
        appearance: {
          overlays: 'dialog',
          variables: appearanceVariables,
        },
        locale,
      });
    } else {
      const instance = loadConnectAndInitialize({
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
        appearance: {
          overlays: 'dialog',
          variables: appearanceVariables,
        },
        locale,
        fetchClientSecret: async () => {
          return await fetchClientSecret();
        },
        metaOptions: {
          flagOverrides: {
            // Hide testmode stuff
            enable_sessions_demo: true,
          },
        },
      } as any);

      setStripeConnectInstance(instance);
    }
  }, [
    stripeConnectInstance,
    locale,
    fetchClientSecret,
    demoOnboarding,
    appearanceVariables,
  ]);

  return {
    hasError,
    stripeConnectInstance,
  };
};
