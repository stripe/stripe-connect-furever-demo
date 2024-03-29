'use client';

import {useConnect} from '@/app/hooks/useConnect';
import {
  ConnectComponentsProvider,
  ConnectPaymentMethodSettings,
} from '@stripe/react-connect-js';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function PaymentMethods() {
  const {hasError, stripeConnectInstance} = useConnect();
  if (hasError || !stripeConnectInstance) {
    return null;
  }

  return (
    <div className="bg-white p-8 rounded-lg mb-6">
      <header className="mb-8">
        <h1 className="text-xl font-semibold">Payment methods</h1>
        <h2 className="text-sm">Add and manage your payment methods here.</h2>
      </header>
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        <EmbeddedComponentContainer>
          <ConnectPaymentMethodSettings />
        </EmbeddedComponentContainer>
      </ConnectComponentsProvider>
    </div>
  );
}
