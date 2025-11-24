import {useEffect, useState} from 'react';
import {useGetStripeAccount} from '@/app/hooks/useGetStripeAccount';

export const useExpressDashboardLoginLink = () => {
  const {stripeAccount, loading} = useGetStripeAccount();
  const [hasExpressDashboardAccess, setHasExpressDashboardAccess] =
    useState<boolean>(false);
  const [expressDashboardLoginLink, setExpressDashboardLoginLink] =
    useState<string>();

  useEffect(() => {
    if (!loading && stripeAccount) {
      const hasAccess =
        stripeAccount?.controller?.stripe_dashboard?.type === 'express';
      setHasExpressDashboardAccess(hasAccess);

      if (hasAccess) {
        const fetchLoginLink = async () => {
          try {
            const res = await fetch('/api/login_link');
            const data = await res.json();
            setExpressDashboardLoginLink(data.url);
          } catch (error) {
            console.error('Error fetching login link:', error);
          }
        };
        fetchLoginLink();
      }
    } else if (!loading) {
      setHasExpressDashboardAccess(false);
      setExpressDashboardLoginLink(undefined);
    }
  }, [stripeAccount, loading]);

  return {hasExpressDashboardAccess, expressDashboardLoginLink};
};
