'use strict';

require('dotenv').config({path: './.env'});
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01; embedded_connect_beta=v1',
});

// Middleware that requires a logged-in salon
function salonRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

// Middleware that requires a logged-in salon and a Stripe account
function stripeAccountRequired(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  if (!req.user?.stripeAccountId) {
    return res.redirect('/signup');
  }
  next();
}

async function retrieveStripeAccount(accountId) {
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

module.exports = {
  retrieveStripeAccount,
  salonRequired,
  stripeAccountRequired,
};
