import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';

export interface FinancingOfferParams {
  offerState?: string;
  source?: string;
}

export interface FinancingOfferResult {
  success: boolean;
  correlationId: string;
  offerState: string;
  accountId: string;
  duration?: number;
  error?: string;
}

export async function validateSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.stripeAccountId) {
    return {
      error: 'No account found in session',
      status: 400,
    };
  }

  return {
    session,
    accountId: session.user.stripeAccountId,
  };
}

export async function createFinancingOffer(
  params: FinancingOfferParams
): Promise<FinancingOfferResult> {
  const sessionResult = await validateSession();

  if ('error' in sessionResult) {
    throw new Error(sessionResult.error);
  }

  const {accountId} = sessionResult;
  const offerState = params.offerState || 'delivered';
  const source = params.source || 'unknown';

  const correlationId = `${source}_${accountId}_${Date.now()}`;

  console.log(
    `[CAPITAL_OFFER_START] account_id=${accountId} correlation_id=${correlationId} offer_state=${offerState} source=${source}`
  );

  try {
    const startTime = Date.now();

    await stripe.rawRequest('POST', '/v1/capital/financing_offers/test_mode', {
      max_premium_amount: 10000_00,
      max_advance_amount: 100000_00,
      max_withhold_rate_str: 0.15,
      is_refill: false,
      financing_type: 'flex_loan',
      state: offerState,
      is_youlend: false,
      is_fixed_term: false,
      'loan_repayment_details[repayment_interval_duration_days]': 60,
      'loan_repayment_details[target_payback_weeks]': 42,
      country: 'US',
      connected_account: accountId,
    });

    const duration = Date.now() - startTime;

    console.log(
      `[CAPITAL_OFFER_SUCCESS] account_id=${accountId} correlation_id=${correlationId} duration_ms=${duration} offer_state=${offerState} source=${source}`
    );

    return {
      success: true,
      correlationId,
      offerState,
      accountId,
      duration,
    };
  } catch (error: any) {
    console.error(
      `[CAPITAL_OFFER_FAILURE] account_id=${accountId} correlation_id=${correlationId} error_type=${error.constructor.name} error_message=${(error.message || '').substring(0, 200)} source=${source}`
    );

    return {
      success: false,
      correlationId,
      offerState,
      accountId,
      error: error.message || 'Failed to create financing offer',
    };
  }
}
