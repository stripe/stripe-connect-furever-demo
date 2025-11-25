import {Stripe} from 'stripe';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {getServerSession} from 'next-auth';
import {NextRequest} from 'next/server';

const customers = [
  {
    email: 'labradoodle@stripe.com',
    name: 'Odie',
    description: 'Full grooming package for large Labradoodle',
  },
  {
    email: 'poodle@stripe.com',
    name: 'Snoopy ',
    description: 'Nail trimming for toy Poodle',
  },
  {
    email: 'golden_retriever@stripe.com',
    name: 'Dug',
    description:
      'Hydro surge warm water shampoo & conditioner for Golden Retriever',
  },
  {
    email: 'siamese_cat@stripe.com',
    name: 'Garfield',
    description: 'Flea and tick treatments for Siamese cat',
  },
  {
    email: 'argente_rabbit@stripe.com',
    name: 'Bugs Bunny',
    description: 'Fur brushing and trimming for Argente Rabbit',
  },
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a test Checkout Session for a merchant. This is used to show the payment
 * methods that are available after toggling them in the Payment Method settings.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const redirectUrl = `${process.env.NEXTAUTH_URL}/settings`;
    const params = await req.json();

    if (!session?.user?.stripeAccountId) {
      return new Response('Unauthorized or no Stripe account found', {
        status: 401,
      });
    }

    const stripeAccount = await stripe.accounts.retrieve(
      session.user.stripeAccountId
    );

    const currency =
      params.currency && params.currency !== '_default'
        ? params.currency
        : stripeAccount.default_currency;
    const amount = params.amount
      ? parseFloat(params.amount) * 100
      : getRandomInt(4000, 12000);

    const {description: nameAndDescription} =
      customers[Math.floor(Math.random() * customers.length)];

    const checkoutSessionResponse = await stripe.checkout.sessions.create(
      {
        line_items: [
          {
            price_data: {
              currency,
              unit_amount: amount,
              product_data: {
                name: nameAndDescription,
                description: nameAndDescription,
              },
            },
            quantity: 1,
          },
        ],
        payment_intent_data: {
          description: nameAndDescription,
          statement_descriptor: 'FurEver',
        },
        mode: 'payment',
        success_url: redirectUrl,
        cancel_url: redirectUrl,
      },
      {
        stripeAccount: session?.user.stripeAccountId,
      }
    );

    console.log('Created checkout session!', checkoutSessionResponse);

    if (!checkoutSessionResponse || !checkoutSessionResponse.url) {
      throw new Error('Session URL was not returned');
    }

    return new Response(
      JSON.stringify({
        checkoutSessionResponse,
      }),
      {status: 200, headers: {'Content-Type': 'application/json'}}
    );
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create a checkout session',
      error
    );
    return new Response(error.message, {status: 500});
  }
}
