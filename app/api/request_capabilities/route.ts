import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {getServerSession} from 'next-auth';
import {NextRequest} from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response('Unauthorized', {status: 401});
  }
  const accountId = session?.user.stripeAccount.id;
  const json = await req.json();
  const {configuration} = json;

  try {
    await stripe.v2.core.accounts.update(accountId, {
      configuration,
    });

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
