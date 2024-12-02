'use client';

import * as React from 'react';
import {useSettings} from '@/app/hooks/useSettings';
import {LoaderCircle} from 'lucide-react';
import Stripe from '@stripe/stripe';
import {SubscriptionPortalWidget} from '@/app/components//SubscriptionPortalWidget';
import {SubscriptionNextBillWidget} from '@/app/components/SubscriptionNextBillWidget';
const PRICING_TABLE_LIGHTMODE = 'prctbl_1QPsgcPohO0XT1fpB7GNfR0w';
const PRICING_TABLE_DARKMODE = 'prctbl_1QReWBPohO0XT1fppR505n6b';

const StripePricingTable = ({
  customerSession,
}: {
  customerSession: Stripe.CustomerSession;
}) => {
  const {theme} = useSettings();
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement('stripe-pricing-table', {
    'pricing-table-id':
      theme === 'dark' ? PRICING_TABLE_DARKMODE : PRICING_TABLE_LIGHTMODE,
    'publishable-key': process.env.STRIPE_PUBLISHABLE_KEY,
    'customer-session-client-secret': customerSession,
  });
};

export default function Billing() {
  const [loading, setLoading] = React.useState(true);
  const [customerSession, setCustomerSession] = React.useState(null);
  const [subscriptions, setSubscriptions] =
    React.useState<Array<Stripe.Subscription> | null>(null);

  React.useEffect(() => {
    if (customerSession && subscriptions) {
      return;
    }
    const fetchSubscription = async () => {
      const response = await fetch('/api/subscriptions');
      const json = await response.json();
      if (!response.ok) {
        // Handle errors on the client side here
        const {error} = json;
        console.warn('An error occurred: ', error);
      } else {
        setSubscriptions(json.subscriptions);
      }
    };
    const fetchCustomerSession = async () => {
      const response = await fetch('/api/customer_session', {method: 'POST'});
      const json = await response.json();
      if (!response.ok) {
        // Handle errors on the client side here
        const {error} = json;
        console.warn('An error occurred: ', error);
      } else {
        setCustomerSession(json.session);
      }
    };
    // We fetch the customer session and subscription data in parallel
    // to avoid lag. If the user has subscriptions, we won't use the session.
    Promise.all([fetchCustomerSession(), fetchSubscription()]).then(() => {
      setLoading(false);
    });
  }, [customerSession, subscriptions]);

  let body = null;

  if (loading) {
    body = (
      <div className="flex items-center justify-center">
        <div className='text-accent font-medium flex flex-row items-center text-lg mt-20'>
          Loading your billing details
          <LoaderCircle className="animate-spin ml-2" size={20} />
        </div>
      </div>
    );
  } else if (subscriptions && subscriptions.length > 0) {
    const subscription = subscriptions[0];
    const paymentMethod =
      subscription.default_payment_method as Stripe.PaymentMethod;
    // We expanded these properties in the API call, so we need to cast them as the full objects
    const plan = (subscription as any).plan as Stripe.Plan;
    const product = plan.product as Stripe.Product;
    body = (
      <div className="flex flex-col xl:flex-row">
        <SubscriptionPortalWidget
          paymentMethod={paymentMethod}
          product={product}
          plan={plan}
        />
        <SubscriptionNextBillWidget subscription={subscription} />
      </div>
    );
  } else if (customerSession) {
    body = <StripePricingTable customerSession={customerSession} />;
  } else {
    body = <div>Something went wrong</div>;
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Billing</h1>
      </div>
      {body}
    </>
  );
}
