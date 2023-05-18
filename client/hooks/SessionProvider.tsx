import React, {createContext, useContext} from 'react';
import Stripe from 'stripe';
import {FullScreenLoading} from '../components/FullScreenLoading';
import {useMutation} from 'react-query';
import {ErrorState} from '../components/ErrorState';

type SessionContext = {
  user?: Express.User | null;
  stripeAccount?: Stripe.Account | null;
  refetch: () => void;
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

const SessionContext = createContext<SessionContext>({
  refetch: () => {},
});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({children}: {children: React.ReactNode}) => {
  const {data: session, isLoading, error, mutate} = useFetchPreloaded();

  React.useEffect(() => {
    mutate();
  }, []);

  if (error) {
    return <ErrorState errorMessage={error.message} retry={mutate} />;
  }
  if (!session || isLoading) return <FullScreenLoading />;

  return (
    <SessionContext.Provider value={{...session, refetch: mutate}}>
      {children}
    </SessionContext.Provider>
  );
};
