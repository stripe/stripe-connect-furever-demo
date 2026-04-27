import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {getFinancingOffersList} from '../api_helpers';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('The current route requires authentication', {
        status: 403,
      });
    }

    const connected_account = session.user.stripeAccountId;

    const overrideApiVersion =
      '2026-03-25.dahlia; capital_line_of_credit_preview=v1';

    const offer = await getFinancingOffersList({connected_account, limit: 1})
      .then((response) => {
        return response.data.at(0);
      })
      .catch((reason) => {
        throw new Error(
          'An error occurred when calling the Stripe API to list financing offers',
          reason
        );
      });

    return new Response(
      JSON.stringify({
        offer,
      }),
      {status: 200, headers: {'Content-Type': 'application/json'}}
    );
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to list financing offers',
      error
    );
    return new Response(error.message, {status: 500});
  }
}
