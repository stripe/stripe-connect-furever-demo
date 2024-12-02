import {Banner} from '@/components/ui/banner';
import {Button} from '@/components/ui/button';
import {CreditCard as CreditCardIcon, X as CancelIcon} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {useRouter, usePathname} from 'next/navigation';
import React from 'react';

const fetchSubscription = async () => {
  const response = await fetch('/api/subscriptions');
  const json = await response.json();
  if (!response.ok) {
    console.warn('An error occurred: ', json.error);
    return {hasSubscription: true};
  }
  return {hasSubscription: json.has_subscription as boolean};
};

export const SubscriptionsBanner = () => {
  const router = useRouter();
  const pathname = usePathname();
  const withinBilling = pathname.startsWith('/billing');

  const [showBanner, setShowBanner] = React.useState(false);
  React.useEffect(() => {
    fetchSubscription().then(({hasSubscription}) => {
      setShowBanner(!hasSubscription);
    });
  }, []);

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
        <CancelIcon
          className="ml-2 text-white hover:opacity-80"
          size={20}
          onClick={() => {
            setShowBanner(false);
            setTimeout(() => {
              setShowBanner(true);
            }, 10000);
          }}
          cursor={'pointer'}
        />
      </div>
    </Banner>
  );
};
