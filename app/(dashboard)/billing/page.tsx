'use client';

import * as React from 'react';
import {LoaderCircle} from 'lucide-react';
import {useSettings} from '@/app/hooks/useSettings';
import {useSearchParams} from 'next/navigation';

const PRICING_TABLE_LIGHTMODE = 'prctbl_1QPsgcPohO0XT1fpB7GNfR0w';
const PRICING_TABLE_DARKMODE = 'prctbl_1QReWBPohO0XT1fppR505n6b';

const StripePricingTable = () => {
  const {theme} = useSettings();
  const [customerSession, setCustomerSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  React.useEffect(() => {
    if (customerSession) {
      return;
    }
    const fetchData = async () => {
      const response = await fetch('/api/customer_session', {method: 'POST'});
      const json = await response.json();
      if (!response.ok) {
        // Handle errors on the client side here
        const {error} = json;
        console.warn('An error occurred: ', error);
      } else {
        setCustomerSession(json.session);
        setLoading(false);
      }
    };
    fetchData();
  }, [customerSession]);

  if (loading || !customerSession) {
    return (
      <LoaderCircle className="align-center ml-1 animate-spin" size={60} />
    );
  }

  return React.createElement('stripe-pricing-table', {
    'pricing-table-id':
      theme === 'dark' ? PRICING_TABLE_DARKMODE : PRICING_TABLE_LIGHTMODE,
    'publishable-key':
      'pk_test_51QPruLPohO0XT1fpWpEciHgkU2awScnyBaMA1hESnsaHAKjqRM94kl2qnLD6dqbaAsqUOUVLvJzJPATPy0Mr31xR00bN6fnSzg',
    'customer-session-client-secret': customerSession,
  });
};

export default function Billing() {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Billing</h1>
      </div>
      <StripePricingTable />
    </>
  );
}
