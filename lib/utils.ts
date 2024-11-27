import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {Stripe} from '@stripe/stripe';
import { Country, currencyForCountry } from '../types/account';

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

export function accountDetailsSubmitted(account?: Stripe.V2.Core.Account) {
  return !!account?.identity?.attestations?.terms_of_service?.account;
}

export function defaultCurrency(account?: Stripe.V2.Core.Account) {
  if (!account) {
    return 'usd';
  }
  if (account.defaults?.currency){
    return account.defaults.currency;
  }

  const country = account.identity?.country;
  if (!country || !(country in currencyForCountry)) {
    return 'usd';
  }

  return currencyForCountry[country];
}
