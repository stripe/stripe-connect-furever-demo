import {Banner} from '@/components/ui/banner';
import {X as CancelIcon} from 'lucide-react';
import React from 'react';
import {usePathname, useSearchParams} from 'next/navigation';

export const SuccessfulSubscriptionBanner = () => {
  const [showBanner, setShowBanner] = React.useState(true);

  const pathname = usePathname();
  const withinBilling = pathname.startsWith('/billing');

  const searchParams = useSearchParams();

  const successfulSubscription = searchParams.get('success') === 'true';
  const successfulCheckoutSession = searchParams.get('checkout_session');

  if (!withinBilling || !successfulSubscription) {
    return null;
  }

  console.log('Successful checkout session: ', successfulCheckoutSession);

  return (
    <Banner open={showBanner} variant="cool_gradient">
      <span className="flex items-center text-sm font-medium text-white sm:text-base md:text-lg">
        {'Congratulations on your new subscription!'}
      </span>
      <div className="flex flex-row items-center">
        <CancelIcon
          className="ml-2 text-white hover:opacity-80"
          size={20}
          onClick={() => {
            setShowBanner(false);
          }}
          cursor={'pointer'}
        />
      </div>
    </Banner>
  );
};
