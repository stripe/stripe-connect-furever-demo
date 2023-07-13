import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config({path: './.env'});
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-ignore If you wish to remain on your account's default API version, you may pass null or another version instead of the latest version, and add a @ts-ignore comment here and anywhere the types differ between API versions.
  apiVersion: '2022-08-01; embedded_connect_beta=v1;unified_accounts_beta=v1',
});