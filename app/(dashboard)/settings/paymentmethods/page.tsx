'use client';

import {ConnectPaymentMethodSettings} from '@stripe/react-connect-js';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

export default function PaymentMethods() {
  return (
    <div className="bg-white p-8 rounded-lg mb-6">
      <header className="mb-8">
        <h1 className="text-xl font-semibold">Payment methods</h1>
        <h2 className="text-sm">Add and manage your payment methods here.</h2>
      </header>
      <EmbeddedComponentContainer>
        <ConnectPaymentMethodSettings />
      </EmbeddedComponentContainer>
    </div>
  );
}
