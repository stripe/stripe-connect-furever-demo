import {useEffect, useMemo, useState, useCallback} from 'react';
import {type StripeConnectInstance} from '@stripe/connect-js';
import {loadConnectAndInitialize} from '@stripe/connect-js';
import {useSettings} from '@/app/hooks/useSettings';
import {
  DarkTheme,
  defaultPrimaryColor,
  LightTheme,
} from '@/app/contexts/themes/ThemeConstants';

export const useConnect = () => {
  const [hasError, setHasError] = useState(false);
  const [stripeConnectInstance, setStripeConnectInstance] =
    useState<StripeConnectInstance | null>(null);

  const settings = useSettings();
  const locale = settings.locale;
  const theme = settings.theme;
  const overlay = settings.overlay;
  const primaryColor = settings.primaryColor || defaultPrimaryColor;

  const fetchClientSecret = useCallback(async () => {
    // Fetch the AccountSession client secret
    const response = await fetch('/api/account_session', {
      method: 'POST',
      body: JSON.stringify({}),
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
  }, []);

  const appearanceVariables = useMemo(() => {
    const baseTheme = theme === 'dark' ? DarkTheme : LightTheme;

    // If we have a custom primary color, override the theme colors
    if (primaryColor && primaryColor !== defaultPrimaryColor) {
      return {
        ...baseTheme,
        colorPrimary: primaryColor,
        buttonPrimaryColorBackground: primaryColor,
      };
    }

    return baseTheme;
  }, [theme, primaryColor]);

  useEffect(() => {
    if (stripeConnectInstance) {
      stripeConnectInstance.update({
        appearance: {
          overlays: overlay || 'dialog',
          variables: appearanceVariables || LightTheme,
        },
        locale,
      });
    } else {
      const instance = loadConnectAndInitialize({
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
        appearance: {
          overlays: overlay || 'dialog',
          variables: appearanceVariables || LightTheme,
        },
        locale,
        fetchClientSecret: async () => {
          return await fetchClientSecret();
        },
      });

      setStripeConnectInstance(instance);
    }
  }, [
    stripeConnectInstance,
    locale,
    fetchClientSecret,
    appearanceVariables,
    overlay,
  ]);

  return {
    hasError,
    stripeConnectInstance,
  };
};
