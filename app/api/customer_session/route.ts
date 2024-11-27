import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {NextRequest} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const accountId = session?.user?.stripeAccount?.id;

    if (!accountId) {
      console.error('No account ID found for user');
      return new Response('No account ID found for user', {
        status: 400,
      });
    }

    const customerSession = await stripe.customerSessions.create(
      {
        customer: accountId,
        components: {
          pricing_table: {
            enabled: true,
          },
        },
      },
      {
        stripeAccount: accountId,
      }
    );
    return new Response(
      JSON.stringify({
        session: customerSession.client_secret,
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
