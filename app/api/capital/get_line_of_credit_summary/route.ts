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

    return await stripe.capital.financingSummaries
      .retrieve(
        {},
        {
          apiVersion: '2026-06-03.preview; capital_line_of_credit_preview=v1',
          stripeAccount: connected_account,
        }
      )
      .then((summary) => {
        return new Response(JSON.stringify(summary), {
          status: 200,
          headers: {'Content-Type': 'application/json'},
        });
      })
      .catch((error) => {
        const message = error?.['raw']?.['message'];
        if (
          message?.includes(
            'You do not have permission to pass this beta header'
          )
        ) {
          return new Response(
            JSON.stringify({
              reason: 'You do not have permission to pass this beta header',
            }),
            {
              status: 400,
              headers: {'Content-Type': 'application/json'},
            }
          );
        } else {
          return new Response(JSON.stringify(error), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
          });
        }
      });
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to retrieve financing summary',
      error
    );
    return new Response(error.message, {status: 500});
  }
}
