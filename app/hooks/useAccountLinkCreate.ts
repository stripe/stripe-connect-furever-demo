import * as React from 'react';
import {useQuery} from '@tanstack/react-query';
import Stripe from 'stripe';

export const useAccountLinkCreate = () => {
  return useQuery<Stripe.AccountLink, Error>({
    queryKey: ['accountLinkCreate'],
    queryFn: async () => {
      const response = await fetch('/api/create_account_link', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
};
