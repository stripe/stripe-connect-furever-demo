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

    // Create an onboarding account link for the connected account
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      type: 'account_onboarding',
      refresh_url: `${process.env.NEXTAUTH_URL}/onboarding`,
      return_url: `${process.env.NEXTAUTH_URL}/home?shownux=true`,
    });

    return new Response(JSON.stringify(accountLink), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create an account link',
      error
    );
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  }
}
