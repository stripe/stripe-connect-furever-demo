import Salon from '@/app/models/salon';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {getServerSession} from 'next-auth';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('The current route requires authentication', {
        status: 403,
      });
    }

    const accountId = session.user.stripeAccountId;

    // Wait for account verification to complete
    while (true) {
      const account = await stripe.accounts.retrieve(accountId);

      if (
        account.requirements?.disabled_reason !==
        'requirements.pending_verification'
      ) {
        console.log('Account verification completed');
        break;
      }

      console.log(
        'Account still pending verification, checking again in 1 second'
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const charges = await stripe.charges.list(
      {
        limit: 1,
      },
      {
        stripeAccount: session?.user.stripeAccountId,
      }
    );
    const chargeCount = charges.data.length;
    if (chargeCount > 0) {
      return new Response('Already setup', {status: 200});
    }

    for (let i = 0; i < 10; i++) {
      await stripe.paymentIntents.create(
        {
          amount: getRandomInt(5000, 200000),
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never',
          },
          confirm: true,
          payment_method: 'pm_card_bypassPending',
          description: 'Classic wash and groom',
          receipt_email: 'receipt_test@stripe.com',
        },
        {
          stripeAccount: accountId,
        }
      );
    }
    await stripe.paymentIntents.create(
      {
        amount: getRandomInt(5000, 20000),
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
        confirm: true,
        payment_method: 'pm_card_createDispute',
        receipt_email: 'dispute_test@stripe.com',
      },
      {
        stripeAccount: accountId,
      }
    );
    for (let i = 0; i < 3; i++) {
      await stripe.payouts.create(
        {
          amount: getRandomInt(5000, 20000),
          currency: 'USD',
          description: 'TEST PAYOUT',
        },
        {
          stripeAccount: accountId,
        }
      );
    }
    // Create Capital financing offer for demo accounts
    // This only affects accounts created through the demo flow, so it's always safe
    const correlationId = `web_${accountId}_${Date.now()}`;

    try {
      // Log structured start for monitoring
      console.log(
        `[CAPITAL_OFFER_START] account_id=${accountId} correlation_id=${correlationId} source=web`
      );

      const startTime = Date.now();
      await stripe.rawRequest(
        'POST',
        '/v1/capital/financing_offers/test_mode',
        {
          max_premium_amount: 10000_00,
          max_advance_amount: 100000_00,
          max_withhold_rate_str: 0.15,
          is_refill: false,
          financing_type: 'flex_loan',
          state: 'delivered',
          is_youlend: false,
          is_fixed_term: false,
          'loan_repayment_details[repayment_interval_duration_days]': 60,
          'loan_repayment_details[target_payback_weeks]': 42,
          country: 'US',
          connected_account: accountId,
        }
      );
      const duration = Date.now() - startTime;

      // Log structured success for monitoring
      console.log(
        `[CAPITAL_OFFER_SUCCESS] account_id=${accountId} correlation_id=${correlationId} duration_ms=${duration} source=web`
      );

      // Note: We don't update account metadata here since this is for web sessions
      // The Python script handles metadata for bulk account management
    } catch (error: any) {
      // Log structured error for monitoring/alerting
      console.error(
        `[CAPITAL_OFFER_FAILURE] account_id=${accountId} correlation_id=${correlationId} error_type=${error.constructor.name} error_message=${(error.message || '').substring(0, 200)} source=web`
      );
      // Continue with setup even if Capital offer creation fails
    }

    const update = {
      setup: true,
    };
    console.log('updating account with, ', update);

    await Salon.findOneAndUpdate({email: session?.user?.email}, update);

    return new Response('Success', {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create test data',
      error
    );
    return new Response(error.message, {status: 500});
  }
}
