import React, {createContext, useContext, useState} from 'react';
import Stripe from 'stripe';
import {FullScreenLoading} from '../components/FullScreenLoading';

const fetchPreloaded = async (): Promise<SessionContext | undefined> => {
  const response = await fetch('/api/preloaded');
  const responseJson = await response.json();
  return responseJson;
};

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

const SessionContext = createContext<SessionContext>({});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({children}: {children: React.ReactNode}) => {
  const [session, setSession] = useState<SessionContext | undefined>(undefined);
  // const queryClient = useQueryClient();
  // const prefetchPreloaded = async () => {
  //   // The results of this query will be cached like a normal query
  //   await queryClient.prefetchQuery({
  //     queryKey: ['todos'],
  //     queryFn: fetchPreloaded,
  //   });
  // };

  // React.useEffect(() => {
  //   prefetchPreloaded();
  // }, []);
  // const {data, status} = useFetchPreloaded();
  // if (status === 'error') {
  //   return <div>Error</div>;
  // } else if (status === 'loading' || !data) {
  //   return <div>Loading...</div>;
  // }
  React.useEffect(() => {
    const runAsync = async () => {
      const preloaded = await fetchPreloaded();
      setSession(preloaded);
    };
    runAsync();
  }, []);

  if (!session) return <FullScreenLoading />;

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
