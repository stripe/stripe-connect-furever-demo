import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {NextRequest} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('The current route requires authentication', {
        status: 403,
      });
    }

    const connected_account = session.user.stripeAccountId;

    const state = (await req.json())['offerState'] || 'delivered';

    await stripe.rawRequest(
      'POST',
      '/v1/test_helpers/capital/line_of_credit/create_or_refresh',
      {
        connected_account: connected_account,
        country: 'US',
        max_advance_amount: 75000_00,
        max_premium_amount: 2000_00,
        max_withhold_rate_str: '0.15',
        accepted_advance_amount: 5000_00,
      }
    );

    return new Response(JSON.stringify({}), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create test financing offer',
      error
    );
    return new Response(error.message, {status: 500});
  }
}
