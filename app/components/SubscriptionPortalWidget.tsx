import Stripe from '@stripe/stripe';
import Container from './Container';
import {PaymentIcon, PaymentType} from 'react-svg-credit-card-payment-icons';
import React from 'react';
import {ChevronRight} from 'lucide-react';

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

const RowButton = React.forwardRef<
  HTMLAnchorElement,
  React.LinkHTMLAttributes<HTMLAnchorElement>
>(({children, ...props}, ref) => {
  return (
    <a className="flex flex-row py-5 hover:opacity-80" {...props} ref={ref}>
      <span className="flex-grow text-lg font-medium text-subdued">
        {children}
      </span>
      <ChevronRight className="text-subdued" />
    </a>
  );
});
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
  return (
    <Container className="flex flex-grow flex-col">
      <div className="flex flex-row items-center">
        <h1 className="flex-grow text-xl font-bold text-accent">
          {product.description}
        </h1>
        <span className="cursor-pointer text-sm text-accent hover:opacity-80">
          Plan details
        </span>
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
        <RowButton>Change plans</RowButton>
        <RowButton>Saved payment method</RowButton>
        <RowButton>Cancel subscription</RowButton>
      </div>
    </Container>
  );
};
