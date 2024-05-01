import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {Stripe} from 'stripe';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function resolveStripeDashboardTypeParam(stripeDashboardType: {}): Stripe.AccountCreateParams.Controller.StripeDashboard.Type {
  if (stripeDashboardType === 'none') {
    return 'none';
  } else if (stripeDashboardType === 'express') {
    return 'express';
  } else {
    return 'full';
  }
}

export function resolveControllerParams({
  feePayer,
  paymentLosses,
  stripeDashboardType,
}: {
  feePayer: {};
  paymentLosses: {};
  stripeDashboardType: {};
}): Stripe.AccountCreateParams.Controller {
  return {
    fees: {
      payer: feePayer === 'application' ? 'application' : 'account',
    },
    losses: {
      payments: paymentLosses === 'application' ? 'application' : 'stripe',
    },
    stripe_dashboard: {
      type: resolveStripeDashboardTypeParam(stripeDashboardType),
    },
    requirement_collection:
      paymentLosses === 'application' && stripeDashboardType === 'none'
        ? 'application'
        : 'stripe',
  };
}
