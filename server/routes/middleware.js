import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config({path: './.env'});
const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01; embedded_connect_beta=v1',
});

// Middleware that requires a logged-in salon
export function userRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res
      .status(500)
      .send({error: 'Complete your profile with FurEver first.'});
  }
  next();
}

// Middleware that requires a logged-in salon and a Stripe account
export function stripeAccountRequired(req, res, next) {
  if (!req.isAuthenticated() || !req.user?.stripeAccountId) {
    return res.status(500).send({error: 'You must onboard with Stripe first.'});
  }
  next();
}

export async function retrieveStripeAccount(accountId) {
  try {
    const account = await stripe.accounts.retrieve(accountId);
    if (account) {
      return account;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}
