'use client';

import React, {useState, useEffect} from 'react';
import {useConnect} from '@/app/hooks/useConnect';
import {
  ConnectComponentsProvider,
  ConnectIssuingCardsList,
  ConnectFinancialAccount,
  ConnectFinancialAccountTransactions,
  useCreateComponent,
} from '@stripe/react-connect-js';
import AuthenticatedAndOnboardedRoute from '@/app/components/AuthenticatedAndOnboardedRoute';
import SubNav from '@/app/components/SubNav';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

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

const ConnectCapitalOverview = () => {
  const {wrapper} = useCreateComponent(
    // @ts-ignore
    'stripe-connect-capital-overview'
  );

  return wrapper;
};

const renderTransactions = (financialAccount: string) => {
  return (
    <>
      <Container>
        <h1 className="text-lg font-bold mb-6">Financial account</h1>
        <EmbeddedComponentContainer>
          <ConnectFinancialAccount financialAccount={financialAccount} />
        </EmbeddedComponentContainer>
      </Container>
      <Container>
        <h1 className="text-lg font-bold">Transactions</h1>
        <EmbeddedComponentContainer>
          <ConnectFinancialAccountTransactions
            financialAccount={financialAccount}
          />
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
};

const renderCards = () => {
  return (
    <Container>
      <h1 className="text-lg font-bold mb-6">Cards</h1>
      <EmbeddedComponentContainer>
        <ConnectIssuingCardsList />
      </EmbeddedComponentContainer>
    </Container>
  );
};

const renderLoans = () => {
  return (
    <div className="bg-white p-8 rounded-lg mb-6">
      <EmbeddedComponentContainer>
        <ConnectCapitalOverview />
      </EmbeddedComponentContainer>
    </div>
  );
};

export default function Finances() {
  const {hasError, stripeConnectInstance} = useConnect();
  const {
    financialAccount,
    error: useFinancialAccountError,
    loading,
  } = useFinancialAccount();

  const [subpage, setSubpage] = useState('transactions');

  const displayFinancialAccount =
    !useFinancialAccountError && financialAccount && !loading;

  if (hasError || !stripeConnectInstance) {
    return null;
  }

  return (
    <AuthenticatedAndOnboardedRoute>
      <header className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Finances</h1>
        <SubNav
          items={[
            {key: 'transactions', label: 'Transactions'},
            {key: 'cards', label: 'Cards'},
            {key: 'loans', label: 'Loans'},
          ]}
          page={subpage}
          setPage={setSubpage}
        />
      </header>
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        {displayFinancialAccount && (
          <>
            {subpage === 'transactions' &&
              financialAccount &&
              renderTransactions(financialAccount)}
            {subpage === 'cards' && renderCards()}
            {subpage === 'loans' && renderLoans()}
          </>
        )}
      </ConnectComponentsProvider>
    </AuthenticatedAndOnboardedRoute>
  );
}
