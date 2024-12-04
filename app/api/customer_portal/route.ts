import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {NextRequest} from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const accountId = session?.user?.stripeAccount?.id;

    if (!accountId) {
      console.error('No account ID found for user');
      return new Response('No account ID found for user', {
        status: 400,
      });
    }

    const returnUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/billing'
        : 'https://v2.furever.dev/billing';

    const billingPortalSession = await stripe.billingPortal.sessions.create({
      customer: accountId,
      return_url: returnUrl,
    });

    return new Response(JSON.stringify(billingPortalSession), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create an account session',
      error
    );
    return new Response(error.message, {status: 500});
  }
}
