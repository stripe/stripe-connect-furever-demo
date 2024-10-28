import {useQuery} from 'react-query';
import Stripe from 'stripe';

export const useGetCharges = () => {
  // Calls FurEver API to get charges
  return useQuery<Stripe.Charge[], Error>('getCharges', async () => {
    const response = await fetch('/api/charges', {
      method: 'GET',
    });
    return await response.json();
  });
};
