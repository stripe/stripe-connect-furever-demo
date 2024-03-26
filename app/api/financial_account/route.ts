import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01; embedded_connect_beta=v2',
});

export async function GET() {
  try {
    // @ts-ignore
    const session = await getServerSession(authOptions);

    const financialAccounts = await stripe.treasury.financialAccounts.list(
      {
        limit: 3,
      },
      {
        stripeAccount: session?.user?.stripeAccount?.id,
      }
    );

    if (financialAccounts.data.length === 0) {
      console.error('No financial accounts found for user');
      return new Response('No financial accounts found for user', {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({
        financial_account: financialAccounts.data[0].id,
      }),
      {status: 200, headers: {'Content-Type': 'application/json'}}
    );
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create an account session',
      error
    );
    return new Response(error.message, {status: 500});
  }
}
