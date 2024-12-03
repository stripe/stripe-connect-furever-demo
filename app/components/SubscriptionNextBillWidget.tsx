import Stripe from '@stripe/stripe';
import Container from './Container';
import {PaymentIcon, PaymentType} from 'react-svg-credit-card-payment-icons';
import React from 'react';
import {ChevronRight, LoaderCircle} from 'lucide-react';
import {useRouter} from 'next/navigation';

const TimestampFormatter = ({timestamp}: {timestamp: number}) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(timestamp * 1000);
};

export const SubscriptionNextBillWidget = ({
  subscription,
}: {
  subscription: Stripe.Subscription;
}) => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const handleCustomerPortal = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const resp = await fetch('/api/customer_portal');
    const body = (await resp.json()) as Stripe.BillingPortal.Session;
    router.push(body.url);
  };

  return (
    <Container className="mt-4 flex h-min flex-col xl:ml-4 xl:mt-0 xl:w-[30%]">
      <div className="flex flex-row items-center pb-2">
        <h1 className="flex-grow text-lg font-bold ">Next bill</h1>
        <span
          className="flex cursor-pointer flex-row text-sm text-accent font-medium	hover:opacity-80"
          onClick={handleCustomerPortal}
        >
          See history
          {loading ? (
            <LoaderCircle className="ml-2 animate-spin text-accent" size={20} />
          ) : (
            <ChevronRight className="ml-1" />
          )}
        </span>
      </div>
      <span className="text-lg font-medium text-subdued">
        <TimestampFormatter timestamp={subscription.current_period_end} />
      </span>
    </Container>
  );
};
