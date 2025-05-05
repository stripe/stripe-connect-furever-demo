import {useCallback, useEffect, useMemo, useState} from 'react';
import {type StripeConnectInstance} from '@stripe/connect-js';
import {loadConnectAndInitialize} from '@stripe/connect-js';
import {useSettings} from '@/app/hooks/useSettings';
import {DarkTheme, LightTheme} from '@/app/contexts/themes/ThemeConstants';

export const useConnect = () => {
  const [hasError, setHasError] = useState(false);
  const [stripeConnectInstance, setStripeConnectInstance] =
    useState<StripeConnectInstance | null>(null);

  const settings = useSettings();
  const locale = settings.locale;
  const theme = settings.theme;
  const [overlay, _] = useState(settings.overlay);

  const fetchClientSecret = useCallback(async () => {
    // Fetch the AccountSession client secret
    const response = await fetch('/api/account_session', {
      method: 'POST',
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

  const appearanceVariables = useMemo(
    () => (theme === 'dark' ? DarkTheme : LightTheme),
    [theme]
  );

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
      } as any);

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
