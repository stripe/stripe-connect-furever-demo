import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-ignore
  apiVersion: '2023-10-16; embedded_connect_beta=v2',
});
