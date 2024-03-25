'use client';

import React, {useState, useEffect} from 'react';
import {useConnect} from '../hooks/useConnect';
import {
  ConnectComponentsProvider,
  ConnectIssuingCardsList,
  useCreateComponent,
  useAttachAttribute,
} from '@stripe/react-connect-js';
import AuthenticatedAndOnboardedRoute from '../components/AuthenticatedAndOnboardedRoute';

const useFinancialAccount = () => {
  const [financialAccount, setFinancialAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/financial_account');
        const json = await response.json();
        setFinancialAccount(json.financial_account);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {loading, financialAccount, error};
};

const ConnectFinancialAccountComponent = ({
  financialAccount,
}: {
  financialAccount: string;
}) => {
  const {wrapper, component: financialAccountComponent} = useCreateComponent(
    // @ts-ignore
    'stripe-connect-financial-account'
  );

  useAttachAttribute(
    financialAccountComponent,
    'financial-account',
    financialAccount
  );

  return wrapper;
};

const ConnectFinancialAccountTransactionsComponent = ({
  financialAccount,
}: {
  financialAccount: string;
}) => {
  const {wrapper, component: financialAccountTransactionsComponent} =
    useCreateComponent(
      // @ts-ignore
      'stripe-connect-financial-account-transactions'
    );

  useAttachAttribute(
    financialAccountTransactionsComponent,
    'financial-account',
    financialAccount
  );

  return wrapper;
};

export default function Finance() {
  const {hasError, stripeConnectInstance} = useConnect();
  const {
    loading,
    financialAccount,
    error: useFinancialAccountError,
  } = useFinancialAccount();

  if (useFinancialAccountError) {
    return null;
  }

  if (hasError || !stripeConnectInstance) {
    return null;
  }

  return (
    <AuthenticatedAndOnboardedRoute>
      <h1 className="text-3xl font-bold">Finance</h1>
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        {financialAccount && !loading && (
          <>
            <div className="bg-white p-8 rounded-lg mb-6">
              <ConnectFinancialAccountComponent
                financialAccount={financialAccount}
              />
            </div>
            <div className="bg-white p-8 rounded-lg mb-6">
              <h1 className="text-lg font-bold">Recent transactions</h1>
              <ConnectFinancialAccountTransactionsComponent
                financialAccount={financialAccount}
              />
            </div>
            <div className="bg-white p-8 rounded-lg mb-6">
              <h1 className="text-lg font-bold">Cards</h1>
              <ConnectIssuingCardsList />
            </div>
          </>
        )}
      </ConnectComponentsProvider>
    </AuthenticatedAndOnboardedRoute>
  );
}
