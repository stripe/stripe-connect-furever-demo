import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config({path: './.env'});
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-ignore
  apiVersion: '2022-08-01',
});
