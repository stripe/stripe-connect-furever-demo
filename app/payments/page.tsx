'use client';

import {useConnect} from '../hooks/useConnect';

import {
  ConnectComponentsProvider,
  ConnectPayments,
} from '@stripe/react-connect-js';
import AuthenticatedAndOnboardedRoute from '../components/AuthenticatedAndOnboardedRoute';

export default function Payouts() {
  const {hasError, stripeConnectInstance} = useConnect();

  if (hasError || !stripeConnectInstance) {
    return null;
  }

  return (
    <AuthenticatedAndOnboardedRoute>
      <h1 className="text-3xl font-bold">Payments</h1>
      <div className="bg-white p-8 rounded-lg mb-6">
        <h1 className="text-lg font-bold">Recent payments</h1>
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectPayments />
        </ConnectComponentsProvider>
      </div>
    </AuthenticatedAndOnboardedRoute>
  );
}
