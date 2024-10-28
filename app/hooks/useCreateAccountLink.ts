import {useQuery} from 'react-query';
import Stripe from 'stripe';

export const useCreateAccountLink = () => {
  // Calls FurEver API to create an account link
  return useQuery<Stripe.AccountLink, Error>('createAccountLink', async () => {
    const response = await fetch('/api/account_link', {
      method: 'POST',
    });
    return await response.json();
  });
};
