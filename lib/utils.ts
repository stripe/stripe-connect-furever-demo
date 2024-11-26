import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {Stripe} from '@stripe/stripe';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveStripeDashboardTypeParam(stripeDashboardType: {}): Stripe.V2.Core.AccountCreateParams.Dashboard {
  if (stripeDashboardType === 'none') {
    return 'none';
  } else if (stripeDashboardType === 'express') {
    return 'express';
  } else {
    return 'full';
  }
}

export function resolveResponsibilitiesParams({
  feesCollector,
  paymentLosses,
}: {
  feesCollector: {};
  paymentLosses: {};
}): Stripe.V2.Core.AccountCreateParams.Defaults.Responsibilities {
  return {
    fees_collector: feesCollector === 'application' ? 'application' : 'stripe',
    losses_collector:
      paymentLosses === 'application' ? 'application' : 'stripe',
  };
}

export function resolveCountryParam(
  country: string
): Stripe.V2.Core.AccountCreateParams.Identity.Country {
  return country.toLowerCase() as Stripe.V2.Core.AccountCreateParams.Identity.Country;
}
