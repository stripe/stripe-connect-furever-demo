import React, {createContext, useContext} from 'react';
import Stripe from 'stripe';
import {FullScreenLoading} from '../components/FullScreenLoading';
import {useQuery} from 'react-query';
import {ErrorState} from '../components/ErrorState';

type SessionContext = {
  user?: Express.User | null;
  stripeAccount?: Stripe.Account | null;
  refetch: () => void;
};

const useFetchSession = () => {
  return useQuery<SessionContext, Error>('fetchSession', async () => {
    const response = await fetch('/api/session', {
      method: 'GET',
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(
        responseJson?.error ?? 'An error ocurred, please try again.'
      );
    }
    return responseJson;
  });
};

const SessionContext = createContext<SessionContext>({
  refetch: () => {},
});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({children}: {children: React.ReactNode}) => {
  const {data: session, isLoading, error, refetch} = useFetchSession();

  // React.useEffect(() => {
  //   mutate();
  // }, []);

  if (error) {
    return <ErrorState errorMessage={error.message} retry={refetch} />;
  }
  if (!session || isLoading) return <FullScreenLoading />;

  return (
    <SessionContext.Provider value={{...session, refetch}}>
      {children}
    </SessionContext.Provider>
  );
};
