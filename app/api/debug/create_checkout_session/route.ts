import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';

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

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01; embedded_connect_beta=v2',
});

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function POST() {
  let checkoutSession;
  try {
    // @ts-ignore
    const session = await getServerSession(authOptions);
    const currency = 'usd';
    let redirectUrl;
    if (process.env.NODE_ENV === 'development') {
      redirectUrl = 'http://localhost:3000/payments';
    } else if (process.env.NODE_ENV === 'production') {
      redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payments`;
    }

    const {description: nameAndDescription} =
      customers[Math.floor(Math.random() * customers.length)];
    checkoutSession = await stripe.checkout.sessions.create(
      {
        line_items: [
          {
            price_data: {
              unit_amount: getRandomInt(4000, 10000), // Use a random amount if input is not provided
              currency: currency,
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
          statement_descriptor: process.env.APP_NAME,
        },
        mode: 'payment',
        success_url: redirectUrl,
        cancel_url: redirectUrl,
      },
      {
        stripeAccount: session?.user?.stripeAccount?.id,
      }
    );

    if (!checkoutSession || !checkoutSession.url) {
      throw new Error('Session URL was not returned');
    }

    return new Response(
      JSON.stringify({
        checkout_session: checkoutSession.url,
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
