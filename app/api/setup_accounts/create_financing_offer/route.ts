import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {NextRequest} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.stripeAccount?.id) {
      return new Response('No account found in session', {status: 400});
    }

    const accountId = session.user.stripeAccount.id;
    const body = await req.json().catch(() => ({}));
    const offerState = body.offerState || 'delivered';

    // Generate correlation ID for tracking
    const correlationId = `manual_${accountId}_${Date.now()}`;

    
    // Log structured start for monitoring
    console.log(`[CAPITAL_OFFER_START] account_id=${accountId} correlation_id=${correlationId} offer_state=${offerState} source=manual`);

    // Create test financing offer
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

    // Log structured success for monitoring
    console.log(`[CAPITAL_OFFER_SUCCESS] account_id=${accountId} correlation_id=${correlationId} duration_ms=${duration} offer_state=${offerState} source=manual`);

    return new Response(
      JSON.stringify({
        success: true,
        correlationId,
        offerState,
        accountId,
      }),
      {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }
    );
  } catch (error: any) {
    const accountId = session?.user?.stripeAccount?.id || 'unknown';
    const correlationId = `manual_error_${Date.now()}`;
    
    // Log structured error for monitoring/alerting
    console.error(`[CAPITAL_OFFER_FAILURE] account_id=${accountId} correlation_id=${correlationId} error_type=${error.constructor.name} error_message=${(error.message || '').substring(0, 200)} source=manual`);

    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to create financing offer',
        correlationId,
      }),
      {
        status: 500,
        headers: {'Content-Type': 'application/json'},
      }
    );
  }
}