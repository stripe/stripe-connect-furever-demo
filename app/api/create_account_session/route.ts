import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';

export async function POST() {
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

  const accountLink = await stripe.accountSessions.create({
    account: stripeAccountId,
    components: {
      account_onboarding: {
        enabled: true,
      },
      payments: {
        enabled: true,
      },
    },
  });

  return new Response(JSON.stringify(accountLink), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  });
}
