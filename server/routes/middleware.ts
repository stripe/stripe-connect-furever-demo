import type {NextFunction, Request, Response} from 'express';
import { stripe } from './stripeSdk.js';

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
