'use client';

import * as React from 'react';
import {loadConnectAndInitialize} from '@stripe/connect-js';
import {
  ConnectComponentsProvider,
  ConnectPayments,
} from '@stripe/react-connect-js';

export const EmbeddedPayments = () => {
  const [stripeConnectInstance] = React.useState(() => {
    const fetchClientSecret = async () => {
      const response = await fetch('/api/create_account_session', {
        method: 'POST',
      });
      if (!response.ok) {
        console.error('An error occurred: ');
        throw new Error('Failed to fetch account session');
      } else {
        const {client_secret} = await response.json();
        return client_secret;
      }
    };

    return loadConnectAndInitialize({
      publishableKey:
        'pk_test_51MZRIlLirQdaQn8EJpw9mcVeXokTGaiV1ylz5AVQtcA0zAkoM9fLFN81yQeHYBLkCiID1Bj0sL1Ngzsq9ksRmbBN00O3VsIUdQ',
      fetchClientSecret: fetchClientSecret,
      // https://docs.stripe.com/connect/customize-connect-embedded-components
      appearance: {
        variables: {
          fontFamily: 'Sohne, inherit',
          colorPrimary: '#27AE60',
          colorBackground: '#ffffff',
          colorBorder: '#D8DEE4',

          buttonPrimaryColorBackground: '#27AE60',
          buttonPrimaryColorText: '#f4f4f5',

          badgeSuccessColorBackground: '#D6FCE6',
          badgeSuccessColorText: '#1E884B',
          badgeSuccessColorBorder: '#94D5AF',

          badgeWarningColorBackground: '#FFEACC',
          badgeWarningColorText: '#C95B4D',
          badgeWarningColorBorder: '#FFD28C',

          overlayBackdropColor: 'rgba(0,0,0,0.3)',
        },
      },
    });
  });

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectPayments />
    </ConnectComponentsProvider>
  );
};
