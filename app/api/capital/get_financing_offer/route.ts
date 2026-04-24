import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';

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

    const offer = await stripe.capital.financingOffers
      .list(
        {
          connected_account: connected_account,
          limit: 1,
        },
        {
          apiVersion: overrideApiVersion,
        }
      )
      .then(
        (response) => {
          return response.data.at(0);
        },
        // fallback to default API version if the override API version is not supported by the platform
        async () => {
          console.log(
            'v1/capital/financing_offers: Unable to use line of credit preview API version. Falling back to default API version.'
          );
          return (
            await stripe.capital.financingOffers.list({
              connected_account: connected_account,
              limit: 1,
            })
          ).data.at(0);
        }
      )
      .catch((reason) => {
        console.error(
          'An error occurred when calling the Stripe API to list financing offers',
          reason
        );
        return new Response(JSON.stringify(reason), {
          status: 500,
          headers: {'Content-Type': 'application/json'},
        });
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
