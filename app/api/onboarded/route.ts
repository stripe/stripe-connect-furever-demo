import {getServerSession} from 'next-auth/next';
import {authOptions} from '../auth/[...nextauth]/route';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01; embedded_connect_beta=v2',
});

export async function GET() {
  try {
    // @ts-ignore
    const session = await getServerSession(authOptions);

    const stripeAccount = await stripe.accounts.retrieve(
      session?.user?.stripeAccount?.id
    );

    console.log(stripeAccount);

    return new Response(
      JSON.stringify({
        onboarded: !!stripeAccount?.details_submitted,
      }),
      {status: 200, headers: {'Content-Type': 'application/json'}}
    );
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to retrieve an account session',
      error
    );
    return new Response(error.message, {status: 500});
  }
}
