import {type NextRequest} from 'next/server';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.stripeAccountId) {
      return new Response('Unauthorized or no Stripe account found', {
        status: 401,
      });
    }

    const stripeAccountId = session.user.stripeAccountId;

    // Retrieve the Stripe account
    const account = await stripe.accounts.retrieve(stripeAccountId);

    return new Response(JSON.stringify(account), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error retrieving Stripe account:', error);
    return new Response('Failed to retrieve Stripe account', {
      status: 500,
    });
  }
}
