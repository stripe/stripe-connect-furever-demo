import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {getServerSession} from 'next-auth';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    const accountId = session?.user.stripeAccount.id;
    const currency = 'usd';

    for (let i = 0; i < 10; i++) {
      await stripe.paymentIntents.create(
        {
          amount: getRandomInt(100, 1500000),
          currency: 'usd',
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never',
          },
          confirm: true,
          payment_method: 'pm_card_bypassPending',
          description: 'Wash and groom',
          receipt_email: 'receipt_test@stripe.com',
        },
        {
          stripeAccount: accountId,
        }
      );
    }
    await stripe.paymentIntents.create(
      {
        amount: getRandomInt(100, 15000),
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
        confirm: true,
        payment_method: 'pm_card_createDispute',
      },
      {
        stripeAccount: accountId,
      }
    );
    for (let i = 0; i < 3; i++) {
    await stripe.payouts.create(
        {
          amount: getRandomInt(10000, 50000),
          currency: "USD",
          description: "TEST PAYOUT",
        },
        {
          stripeAccount: accountId,
        },
      );
    }

    return new Response('Success', {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create a checkout session',
      error
    );
    return new Response(error.message, {status: 500});
  }
}
