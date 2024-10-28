import {type NextRequest} from 'next/server';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    let stripeAccountId = session?.user?.stripeAccount?.id;

    if (!stripeAccountId) {
      return new Response(
        JSON.stringify({
          error: 'No Stripe account found for this user',
        }),
        {status: 400}
      );
    }

    // Create an account session
    const accountSession = await stripe.accountSessions.create({
      account: stripeAccountId,
      components: {
        payments: {
          enabled: true,
        },
        payouts: {
          enabled: true,
        },
      },
    });

    return new Response(JSON.stringify(accountSession), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create an account session',
      error
    );
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  }
}
