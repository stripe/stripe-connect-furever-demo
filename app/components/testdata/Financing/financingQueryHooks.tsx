import * as React from 'react';
import {useQuery} from '@tanstack/react-query';

export const useFinancingOfferFetchQuery = () => {
  return useQuery({
    queryKey: ['financing-data'],
    queryFn: async () => {
      const response = await fetch('/api/capital/get_financing_offer', {
        method: 'get',
      });

      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch financing data', {
          cause: response.text(),
        });
      }
    },
  });
};

export const useLineOfCreditSummaryFetchQuery = () => {
  return useQuery({
    queryKey: ['line-of-credit-summary'],
    queryFn: async () => {
      const response = await fetch('/api/capital/get_line_of_credit_summary', {
        method: 'get',
      });

      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch line of credit summary', {
          cause: response.text(),
        });
      }
    },
  });
};
