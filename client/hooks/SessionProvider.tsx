import React, {createContext, useContext, useState} from 'react';
import Stripe from 'stripe';
import {FullScreenLoading} from '../components/FullScreenLoading';
import {useMutation, useQuery} from 'react-query';
import {ErrorState} from '../components/ErrorState';

export type User = {
  salon: {
    license: string;
    name: string;
    specialty: string;
  };
  type: 'individual' | 'company';
  country: string;
  _id: string;
  email: string;
  password: string;
  created: Date;
  firstName: string;
  lastName: string;
  stripeAccountId: string;
};

type SessionContext = {
  user?: User | null;
  stripeAccount?: Stripe.Account | null;
};

const useFetchPreloaded = () => {
  return useMutation<SessionContext, Error>('fetchPreloaded', () =>
    fetch('/api/preloaded', {
      method: 'GET',
    }).then(async (response) => {
      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(
          responseJson?.error ?? 'An error ocurred, please try again.'
        );
      }
      return responseJson;
    })
  );
};

const SessionContext = createContext<SessionContext>({});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({children}: {children: React.ReactNode}) => {
  const {data: session, isLoading, error, mutate} = useFetchPreloaded();

  React.useEffect(() => {
    mutate();
  }, []);

  if (error) {
    return <ErrorState errorMessage={error.message} handleTryAgain={mutate} />;
  }
  if (!session || isLoading) return <FullScreenLoading />;

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
