import Stripe from 'stripe';

export const latestApiVersion: Stripe.LatestApiVersion = '2025-12-15.preview';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: latestApiVersion,
});
