import Stripe from '@stripe/stripe';
import Container from './Container';
import {PaymentIcon, PaymentType} from 'react-svg-credit-card-payment-icons';
import React from 'react';
import {ChevronRight, LoaderCircle} from 'lucide-react';
import {useRouter} from 'next/navigation';

const stripeBrandToIcon: Record<string, PaymentType> = {
  amex: 'Amex',
  diners: 'Diners',
  discover: 'Discover',
  eftpos_au: 'Generic',
  jcb: 'Jcb',
  mastercard: 'Mastercard',
  unionpay: 'Unionpay',
  visa: 'Visa',
  unknown: 'Generic',
};

const CurrencyFormatter = ({
  value,
  currency,
}: {
  value: number;
  currency: string;
}) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

type RowButtonProps = {
  onClick: () => void;
  loading: boolean;
};
const RowButton = (props: React.PropsWithChildren<RowButtonProps>) => {
  return (
    <a
      className="flex cursor-pointer flex-row py-5 hover:opacity-80"
      {...props}
      onClick={props.onClick}
    >
      <span className="flex-grow text-lg font-medium text-subdued">
        {props.children}
      </span>
      {props.loading ? (
        <LoaderCircle className="ml-2 animate-spin" size={20} />
      ) : (
        <ChevronRight className="text-subdued" />
      )}
    </a>
  );
};
RowButton.displayName = 'RowButton';

export const SubscriptionPortalWidget = ({
  paymentMethod,
  product,
  plan,
}: {
  paymentMethod: Stripe.PaymentMethod;
  plan: Stripe.Plan;
  product: Stripe.Product;
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
    <Container className="flex flex-grow flex-col">
      <div className="flex flex-row items-center">
        <h1 className="flex-grow text-xl font-bold text-accent">
          {product.description}
        </h1>
        <span
          className="cursor-pointer text-sm font-medium text-accent	hover:opacity-80"
          onClick={handleCustomerPortal}
        >
          Plan details
        </span>
        {loading && (
          <LoaderCircle className="ml-2 animate-spin text-accent" size={20} />
        )}
      </div>
      <div className="mt-4 flex-row">
        <span className="text-[28px] font-bold">
          <CurrencyFormatter
            value={plan.amount ? plan.amount / 100 : 0}
            currency={plan.currency}
          />
        </span>
        <span className="text-lg font-bold">
          {' '}
          {plan.interval === 'month' ? 'per month' : 'per year'}
        </span>
      </div>
      {paymentMethod.type === 'card' && paymentMethod.card && (
        <div className="mb-4 flex flex-row items-center">
          <PaymentIcon
            type={stripeBrandToIcon[paymentMethod.card.brand || 'unknown']}
            format="flatRounded"
            width={24}
            height={16}
          />
          <span className="ml-1">
            •••• •••• •••• •••• {paymentMethod.card.last4}
          </span>
        </div>
      )}
      <div className="flex flex-col divide-y">
        <RowButton onClick={handleCustomerPortal} loading={loading}>
          Change plans
        </RowButton>
        <RowButton onClick={handleCustomerPortal} loading={loading}>
          Saved payment method
        </RowButton>
        <RowButton onClick={handleCustomerPortal} loading={loading}>
          Cancel subscription
        </RowButton>
      </div>
    </Container>
  );
};
