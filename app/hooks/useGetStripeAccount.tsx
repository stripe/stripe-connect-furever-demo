import {useQuery} from '@tanstack/react-query';
import {useSession} from 'next-auth/react';
import Stripe from 'stripe';

const fetchStripeAccount = async (): Promise<Stripe.Account> => {
  const response = await fetch('/api/get_stripe_account');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const useGetStripeAccount = () => {
  const {data: session, status} = useSession();

  const {
    data: stripeAccount,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['stripeAccount', session?.user.stripeAccountId],
    queryFn: fetchStripeAccount,
    enabled: status === 'authenticated',
  });

  return {
    stripeAccount: stripeAccount || null,
    loading,
    error: error?.message || null,
  };
};
