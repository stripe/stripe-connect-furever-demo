'use server';

import { getServerSession } from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const stripeAccount = session?.user?.stripeAccount?.id;
    if (!stripeAccount) {
      console.error('No connected account found for user');
      return new Response('No connected account found for user', {
        status: 400,
      });
    }

    let url = '';

    switch (session.user.stripeAccount.controller?.stripe_dashboard?.type) {
      case 'express':
        const link = await stripe.accounts.createLoginLink(stripeAccount);
        url = link.url;
        break;
      case 'full':
        url = `https://dashboard.stripe.com/a/${stripeAccount}`;
        break;
      default:
        return new Response(
          'User does not have access to a Stripe dashboard.',
          {
            status: 400,
          }
        );
    }

    return new Response(
      JSON.stringify({
        url,
      }),
      {status: 200, headers: {'Content-Type': 'application/json'}}
    );
  } catch (error: any) {
    console.error(
      'An error occurred when generating a link for the dashboard',
      error
    );
    return new Response(error.message, {status: 500});
  }
}
