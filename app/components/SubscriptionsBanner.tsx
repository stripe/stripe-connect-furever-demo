import {Banner} from '@/components/ui/banner';
import {Button} from '@/components/ui/button';
import Stripe from '@stripe/stripe';
import {CreditCard as CreditCardIcon, X as CancelIcon} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {useRouter, usePathname} from 'next/navigation';
import React from 'react';
import {useQuery} from 'react-query';

export const SubscriptionsBanner = () => {
  const router = useRouter();
  const pathname = usePathname();
  const withinBilling = pathname.startsWith('/billing');
  const {data} = useQuery({
    queryKey: 'subscriptions',
    queryFn: async () => {
      const response = await fetch('/api/subscriptions');
      const json = await response.json();
      return json.subscriptions as Stripe.Subscription[];
    },
    staleTime: 30000,
    refetchOnMount: false,
  });
  const showBanner = data?.length === 0;

  return (
    <Banner open={showBanner && !withinBilling} variant="cool_gradient">
      <span className="flex items-center text-sm font-medium text-white sm:text-base md:text-lg">
        {
          "Like what you see so far? Don't forget, your free trial will expire in 14 days."
        }
      </span>
      <div className="flex flex-row items-center">
        <Button
          variant="action"
          className="text-sm font-medium text-white sm:text-base"
          onClick={() => {
            router.push('/billing');
          }}
        >
          <CreditCardIcon className="mr-2" />
          {'Subscribe'}
        </Button>
      </div>
    </Banner>
  );
};
