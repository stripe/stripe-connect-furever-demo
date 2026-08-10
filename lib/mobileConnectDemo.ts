import Stripe from 'stripe';
import {latestApiVersion, stripe} from '@/lib/stripe';

type MobileAccountSessionComponents =
  Stripe.AccountSessionCreateParams.Components & {
    check_scanning: {enabled: boolean};
  };

const accountSessionComponents = (
  disableStripeUserAuthentication: boolean
): MobileAccountSessionComponents => ({
  account_onboarding: {
    enabled: true,
    features: {
      external_account_collection: true,
      disable_stripe_user_authentication: disableStripeUserAuthentication,
    },
  },
  payouts: {
    enabled: true,
    features: {
      instant_payouts: true,
      standard_payouts: true,
      edit_payout_schedule: true,
      external_account_collection: true,
      disable_stripe_user_authentication: disableStripeUserAuthentication,
    },
  },
  notification_banner: {
    enabled: true,
    features: {
      external_account_collection: true,
      disable_stripe_user_authentication: disableStripeUserAuthentication,
    },
  },
  payments: {
    enabled: true,
  },
  check_scanning: {
    enabled: true,
  },
});

const accountSessionRequestOptions = {
  apiVersion: `${latestApiVersion}; embedded_connect_beta=v2`,
} as const;

export function assertTestMode() {
  if (!/^(sk|rk)_test_/.test(process.env.STRIPE_SECRET_KEY || '')) {
    throw new Error(
      'The mobile Connect demo endpoints require a test-mode Stripe secret key.'
    );
  }
}

function canRetryWithStripeAuthentication(error: unknown) {
  if (!(error instanceof Stripe.errors.StripeInvalidRequestError)) {
    return false;
  }

  const parameter = error.param || '';
  const message = error.message.toLowerCase();

  return (
    parameter.includes('disable_stripe_user_authentication') ||
    message.includes('disable_stripe_user_authentication') ||
    (message.includes('stripe user authentication') &&
      (message.includes('account type') ||
        message.includes('requirement_collection')))
  );
}

export async function createMobileConnectAccountSession(account: string) {
  assertTestMode();

  try {
    return await stripe.accountSessions.create(
      {
        account,
        components: accountSessionComponents(true),
      },
      accountSessionRequestOptions
    );
  } catch (error) {
    if (!canRetryWithStripeAuthentication(error)) {
      throw error;
    }

    console.warn(
      `Stripe user authentication cannot be disabled for ${account}; retrying with authentication enabled.`
    );

    return stripe.accountSessions.create(
      {
        account,
        components: accountSessionComponents(false),
      },
      accountSessionRequestOptions
    );
  }
}
