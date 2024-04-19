'use client';

import React, {useState, useEffect} from 'react';
import {
  ConnectCapitalOverview,
  ConnectFinancialAccount,
  ConnectFinancialAccountTransactions,
} from '@stripe/react-connect-js';
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

export default function Finances() {
  const {
    financialAccount,
    error: useFinancialAccountError,
    loading,
  } = useFinancialAccount();

  const displayFinancialAccount =
    !useFinancialAccountError && financialAccount && !loading;

  return (
    <>
      <Container>
        <EmbeddedComponentContainer>
          <ConnectCapitalOverview />
        </EmbeddedComponentContainer>
      </Container>
      <Container>
        <h1 className="mb-2 text-xl font-bold ml-2">Financial account</h1>
        <EmbeddedComponentContainer>
          {displayFinancialAccount && (
            <ConnectFinancialAccount financialAccount={financialAccount} />
          )}
        </EmbeddedComponentContainer>
      </Container>
      <Container>
        <h1 className="text-xl font-bold ml-2">Transactions</h1>
        <EmbeddedComponentContainer>
          {displayFinancialAccount && (
            <ConnectFinancialAccountTransactions
              financialAccount={financialAccount}
            />
          )}
        </EmbeddedComponentContainer>
      </Container>
    </>
  );
}
