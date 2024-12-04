'use client';

import * as React from 'react';
import {useSettings} from '@/app/hooks/useSettings';
import {LoaderCircle} from 'lucide-react';
import Stripe from '@stripe/stripe';
import {SubscriptionPortalWidget} from '@/app/components//SubscriptionPortalWidget';
import {SubscriptionNextBillWidget} from '@/app/components/SubscriptionNextBillWidget';
import {useQueries, useQueryClient} from 'react-query';
import {usePathname, useSearchParams} from 'next/navigation';
import EmbeddedComponentContainer from '@/app/components/EmbeddedComponentContainer';

const PRICING_TABLE_LIGHTMODE = 'prctbl_1QPsgcPohO0XT1fpB7GNfR0w';
const PRICING_TABLE_DARKMODE = 'prctbl_1QReWBPohO0XT1fppR505n6b';

const StripePricingTable = ({
  customerSessionSecret,
}: {
  customerSessionSecret: string;
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

  return (
    <EmbeddedComponentContainer componentName="PricingTable">
      {React.createElement('stripe-pricing-table', {
        'pricing-table-id':
          theme === 'dark' ? PRICING_TABLE_DARKMODE : PRICING_TABLE_LIGHTMODE,
        'publishable-key': process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
        'customer-session-client-secret': customerSessionSecret,
      })}
    </EmbeddedComponentContainer>
  );
};

export default function Billing() {
  const [subscriptionsApi, customerSessionSecretApi] = useQueries([
    {
      queryKey: 'subscriptions',
      queryFn: async () => {
        const response = await fetch('/api/subscriptions');
        const json = await response.json();
        return json.subscriptions as Stripe.Subscription[];
      },
      staleTime: 5000,
      refetchOnMount: false,
    },
    {
      queryKey: 'customerSessionSecret',
      queryFn: async () => {
        const response = await fetch('/api/customer_session', {
          method: 'POST',
        });
        const json = await response.json();
        return json.session as string;
      },
      staleTime: 120000,
    },
  ]);
  const pathname = usePathname();
  const withinBilling = pathname.startsWith('/billing');
  const searchParams = useSearchParams();
  const successfulSubscription = searchParams.get('success') === 'true';
  const subscriptionsQueryInvalidated = React.useRef(false);
  const queryClient = useQueryClient();
  React.useEffect(() => {
    if (
      successfulSubscription &&
      withinBilling &&
      !subscriptionsQueryInvalidated.current
    ) {
      queryClient.invalidateQueries('subscriptions');
      subscriptionsQueryInvalidated.current = true;
    }
  }, [successfulSubscription, withinBilling, subscriptionsApi, queryClient]);

  let body = null;
  const subscriptions = subscriptionsApi.data;
  const customerSessionSecret = customerSessionSecretApi.data;
  if (
    subscriptionsApi.isLoading ||
    (subscriptions &&
      subscriptions.length === 0 &&
      customerSessionSecretApi.isLoading)
  ) {
    body = (
      <div className="flex items-center justify-center">
        <div className="mt-20 flex flex-row items-center text-lg font-medium text-accent">
          Loading
          <LoaderCircle className="ml-2 animate-spin" size={20} />
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
  } else if (customerSessionSecret) {
    body = <StripePricingTable customerSessionSecret={customerSessionSecret} />;
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
