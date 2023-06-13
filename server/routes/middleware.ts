import dotenv from 'dotenv';
import Stripe from 'stripe';
import type {NextFunction, Request, Response} from 'express';

dotenv.config({path: './.env'});
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-ignore If you wish to remain on your account's default API version, you may pass null or another version instead of the latest version, and add a @ts-ignore comment here and anywhere the types differ between API versions.
  apiVersion: '2022-08-01; embedded_connect_beta=v1',
});

// Middleware that requires a logged-in salon
export function userRequired(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res
      .status(500)
      .send({error: 'Complete your profile with FurEver first.'});
  }
  next();
}

// Middleware that requires a logged-in salon and a Stripe account
export function stripeAccountRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.isAuthenticated() || !req.user?.stripeAccountId) {
    return res.status(500).send({error: 'You must onboard with Stripe first.'});
  }
  next();
}

export async function retrieveStripeAccount(accountId: string) {
  const account = await stripe.accounts.retrieve(accountId);
  if (account) {
    return account;
  } else {
    throw new Error(`Couldn't retrieve Stripe account: ${accountId}`);
  }
}
