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
    const accountId = session?.user.stripeAccount.id;

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
