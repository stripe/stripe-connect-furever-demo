import Stripe from 'stripe';

export const latestApiVersion = '2026-04-08.preview';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: latestApiVersion,
});
