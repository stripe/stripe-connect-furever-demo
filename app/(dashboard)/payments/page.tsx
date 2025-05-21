'use client';

import * as React from 'react';
import Container from '@/app/components/Container';
import MonthToDateWidget from '@/app/components/MonthToDateWidget';
import CustomersWidget from '@/app/components/CustomersWidget';
import {loadConnectAndInitialize} from '@stripe/connect-js';
import {
  ConnectComponentsProvider,
  ConnectPayments,
} from '@stripe/react-connect-js';

export default function Payments() {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [stripeConnectInstance] = React.useState(() => {
    const fetchClientSecret = async () => {
      const response = await fetch('/api/create_account_session', {
        method: 'POST',
      });
      if (!response.ok) {
        console.error('An error occurred: ');
        setErrorMessage('Failed to initialize Session');
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
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Payments</h1>
      </div>
      <div className="flex flex-col gap-3 md:gap-5 lg:flex-row">
        <div className="flex-1">
          <MonthToDateWidget />
        </div>
        <div className="flex-1">
          <CustomersWidget />
        </div>
      </div>
      <Container>
        <h1 className="text-xl font-bold">Recent payments</h1>
        <div style={{height: '20px'}} />
        <>
          {errorMessage ? (
            <div>{`Error: ${errorMessage}`}</div>
          ) : (
            <div className="container">
              <ConnectComponentsProvider
                connectInstance={stripeConnectInstance}
              >
                <ConnectPayments />
              </ConnectComponentsProvider>
            </div>
          )}
        </>
      </Container>
    </>
  );
}
