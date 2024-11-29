import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {getServerSession} from 'next-auth/next';

export async function GET() {
  const session = await getServerSession(authOptions);
  const stripeAccount = session?.user.stripeAccount;

  if (!stripeAccount) {
    return new Response(
      JSON.stringify({
        has_subscription: true,
      }),
      {status: 200}
    );
  }
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeAccount.id,
    });
    return new Response(
      JSON.stringify({
        has_subscription: subscriptions.data.length > 0,
      }),
      {status: 200}
    );
  } catch (error) {
    // We are soft erroring here since this API is only for the subscriptions banner.
    // It is not critical for the user to see the banner.
    return new Response(
      JSON.stringify({
        has_subscription: false,
      }),
      {status: 200}
    );
  }
}
