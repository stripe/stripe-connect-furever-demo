'use client';

import React, {useState, useEffect} from 'react';
import {
  ConnectCapitalOverview,
  ConnectFinancialAccount,
  ConnectFinancialAccountTransactions,
} from '@stripe/react-connect-js';
import Container from '@/app/components/Container';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';
import {LandmarkIcon, LoaderCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useFinancialAccount} from '@/app/hooks/useFinancialAccount';
import Stripe from '@stripe/stripe';

export default function Finances() {
  const {
    financialAccount,
    error: useFinancialAccountError,
    loading,
  } = useFinancialAccount();
  console.log('financialAccount', financialAccount);
  const [buttonLoading, setButtonLoading] = React.useState(false);

  const onClick = async () => {
    setButtonLoading(true);

    const configuration: Stripe.V2.Core.AccountCreateParams.Configuration = {
      merchant: {
        features: {
          card_payments: {
            requested: true,
          },
        },
      },
      // card_issuing: {
      //   requested: true,
      // },
      // treasury: {
      //   requested: true,
      // },
    };

    try {
      const res = await fetch('/api/request_capabilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          configuration: configuration,
        }),
      });

      if (res.ok) {
        setButtonLoading(false);
        // Page must reload to show the new components
        window.location.reload();
      }
    } catch (e) {
      console.log('Error with fetching financial account: ', e);
    }
  };

  const displayFinancialAccount =
    !useFinancialAccountError && financialAccount && !loading;

  if (loading) {
    return (
      <Container>
        <LoaderCircle className="align-center ml-1 animate-spin" size={60} />
      </Container>
    );
  }

  return (
    <>
      {displayFinancialAccount ? (
        <>
          <Container>
            <EmbeddedComponentContainer componentName="CapitalOverview">
              <ConnectCapitalOverview />
            </EmbeddedComponentContainer>
          </Container>
          <Container>
            <h1 className="mb-2 text-xl font-bold">Financial account</h1>
            <EmbeddedComponentContainer componentName="FinancialAccount">
              <ConnectFinancialAccount financialAccount={financialAccount} />
            </EmbeddedComponentContainer>
          </Container>
          <Container>
            <h1 className="text-xl font-bold">Transactions</h1>
            <EmbeddedComponentContainer componentName="FinancialAccountTransactions">
              <ConnectFinancialAccountTransactions
                financialAccount={financialAccount}
              />
            </EmbeddedComponentContainer>
          </Container>
        </>
      ) : (
        <Container className="flex flex-col items-center justify-center gap-y-6">
          <LandmarkIcon size={52} className="mt-14" />
          <div className="flex flex-col items-center gap-y-1">
            <h1 className="text-xl font-medium"> Financial account </h1>
            <p className="font-normal text-subdued">
              A financial account allows you to access loans, create cards, and
              more. Learn more
            </p>
          </div>
          <Button className="mb-14" onClick={onClick} disabled={buttonLoading}>
            Enable financial account
            {buttonLoading && (
              <LoaderCircle className="ml-1 animate-spin" size={20} />
            )}
          </Button>
        </Container>
      )}
    </>
  );
}
