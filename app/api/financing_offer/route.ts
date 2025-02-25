import {type NextRequest} from 'next/server';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const connected_account = session?.user.stripeAccount.id;

    const existing_offers = await stripe.capital.financingOffers
      .list({
        connected_account,
      })
      .then((response) => {
        return response.data.filter((offer) =>
          ['accepted', 'delivered', 'undelivered', 'paid_out'].includes(
            offer.status
          )
        );
      });

    return new Response(JSON.stringify(existing_offers.at(0) || {}), {
      status: 200,
    });
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create an account session',
      error
    );

    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const connected_account = session?.user.stripeAccount.id;

    const response = await stripe.rawRequest(
      'POST',
      '/v1/capital/financing_offers/test_mode',
      {
        account: connected_account,
        state: 'delivered',
        max_advance_amount: 1000_00,
        max_premium_amount: 10_00,
        max_withhold_rate_str: '0.10',
      }
    );

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create an account session',
      error
    );

    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
    });
  }
}
