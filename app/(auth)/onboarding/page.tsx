'use client';

import React from 'react';
import {loadConnectAndInitialize} from '@stripe/connect-js';
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from '@stripe/react-connect-js';

export default function Onboarding() {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
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
    });
  });

  return (
    <>
      {errorMessage ? (
        <div>{`Error: ${errorMessage}`}</div>
      ) : (
        <div className="container">
          <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
            <ConnectAccountOnboarding
              onExit={() => {
                console.log('Onboarding flow exited. Redirecting to home...');
                window.location.href = '/home';
              }}
            />
          </ConnectComponentsProvider>
        </div>
      )}
    </>
  );
}
