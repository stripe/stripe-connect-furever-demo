import {useEffect, useMemo, useState, useCallback} from 'react';
import {type StripeConnectInstance} from '@stripe/connect-js';
import {loadConnectAndInitialize} from '@stripe/connect-js';
import {useSettings} from '@/app/hooks/useSettings';
import {DarkTheme, LightTheme} from '@/app/contexts/themes/ThemeConstants';

export const useConnect = (demoOnboarding: boolean) => {
  const [hasError, setHasError] = useState(false);
  const [stripeConnectInstance, setStripeConnectInstance] =
    useState<StripeConnectInstance | null>(null);

  const settings = useSettings();
  const locale = settings.locale;
  const theme = settings.theme;
  const primaryColor = settings.primaryColor;
  const [overlay, setOverlay] = useState(settings.overlay);
  const [localTheme, setTheme] = useState(settings.theme);

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
        if (
          localLocale &&
          ['fr-FR', 'zh-Hant-HK', 'en-GB'].includes(localLocale)
        ) {
          // We need a new account session
          newAccountSessionRequired = true;
        }

        break;
    }

    if (locale !== localLocale) {
      setLocalLocale(locale);
    }

    if (theme !== localTheme) {
      setTheme(theme);
    }

    if (demoOnboarding && newAccountSessionRequired) {
      setStripeConnectInstance(null);
    }
  }, [locale, localLocale, demoOnboarding, theme, localTheme]);

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

  const appearanceVariables = useMemo(() => {
    const baseTheme = theme === 'dark' ? DarkTheme : LightTheme;

    // If we have a custom primary color, override the theme colors
    if (primaryColor && primaryColor !== '#27AE60') {
      return {
        ...baseTheme,
        /// TODO: Override more values potentially?
        colorPrimary: primaryColor,
        buttonPrimaryColorBackground: primaryColor,
      };
    }

    return baseTheme;
  }, [theme, primaryColor]);

  useEffect(() => {
    // If we are demoing onboarding, re-init to get a new secret
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
    overlay,
  ]);

  return {
    hasError,
    stripeConnectInstance,
  };
};
