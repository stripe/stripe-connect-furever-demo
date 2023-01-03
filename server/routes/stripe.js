'use strict';

require('dotenv').config({path: '../.env'});
// We are including the beta headers for Connect embedded UIs and Unified accounts
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01; embedded_connect_beta=v1;unified_accounts_beta=v1',
});

const {salonRequired, stripeAccountRequired} = require('./middleware');
const express = require('express');
const router = express.Router();

// Important: We're using static tokens based on specific test card numbers
// to trigger a special behavior. This is NOT how you would create real payments!
// You should use Stripe Elements or Stripe iOS/Android SDKs to tokenize card numbers.
// Use a static token based on a test card: https://stripe.com/docs/testing#cards
const getPaymentMethod = (status) => {
  switch (status) {
    case 'successful':
      return 'pm_card_bypassPending';
    case 'successful_intl':
      return 'pm_card_bypassPendingInternational';
    case 'disputed_fraudulent':
      return 'pm_card_createDispute';
    case 'disputed_product_not_received':
      return 'pm_card_createDisputeProductNotReceived';
    case 'disputed_inquiry':
      return 'pm_card_createDisputeInquiry';
    default:
      return 'pm_card_bypassPending';
  }
};

/**
 * POST /stripe/create-account
 *
 * Create a Stripe account via POST /v1/accounts
 */
router.post('/create-account', salonRequired, async (req, res, next) => {
  // Generate a random string as `state` to protect from CSRF and include it in the session
  req.session.state = Math.random().toString(36).slice(2);

  try {
    const salon = req.user;
    salon.set(req.body); // Try to update the logged-in salon using the newly entered profile data
    await salon.save();

    let accountId = req.user.stripeAccountId;

    // Create a Stripe account for this user if one does not exist already
    if (accountId == undefined) {
      // Define the parameters to create a new Stripe account with
      let accountParams = {
        capabilities: {
          card_payments: {
            requested: true,
          },
          transfers: {
            requested: true,
          },
        },
        country: req.user.country || undefined,
        email: req.user.email || undefined,
        business_profile: {
          name: req.user.salon.name,
        },
        business_type: req.user.type || 'individual',
        // Specify parameters to indicate an account with no dashboard, where Stripe owns loss liability and onboarding and the platform owns pricing
        controller: {
          application: {
            loss_liable: false, // Stripe owns loss liability
            onboarding_owner: false, // Stripe is the onboarding owner
            pricing_controls: true, // The platform is the pricing owner
          },
          dashboard: {
            type: 'none', // The connected account will not have access to dashboard
          },
        },
      };
      if (accountParams.business_type === 'company') {
        accountParams = Object.assign(accountParams, {
          company: {
            name: req.user.salon.name || undefined,
          },
        });
      } else {
        accountParams = Object.assign(accountParams, {
          individual: {
            first_name: req.user.firstName || undefined,
            last_name: req.user.lastName || undefined,
            email: req.user.email || undefined,
          },
        });
      }
      const account = await stripe.accounts.create(accountParams);
      accountId = account.id;
      // Update the model and store the Stripe account ID in the datastore:
      // this Stripe account ID will be used to issue payouts to the salon
      req.user.stripeAccountId = accountId;
      await req.user.save();
    }

    res.status(200);
    return res.send({});
  } catch (error) {
    console.error(`Failed to create a Stripe account: ${error}`);
    res.status(500);
    res.send({error: error.message});
  }
});

router.get('/create-link', stripeAccountRequired, async (req, res, next) => {
  // Generate a random string as `state` to protect from CSRF and include it in the session
  req.session.state = Math.random().toString(36).slice(2);

  try {
    const accountId = req.user.stripeAccountId;

    // Create an account link for the user's Stripe account
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: process.env.PUBLIC_DOMAIN + '/stripe/create-link',
      return_url: process.env.PUBLIC_DOMAIN + '/stripe/onboarded',
      type: 'account_onboarding',
    });

    // Redirect to Stripe to start the hosted onboarding flow
    res.redirect(accountLink.url);
  } catch (err) {
    console.log('Failed to create an account link.');
    console.log(err);
    next(err);
  }
});

/**
 * GET /stripe/onboarded
 *
 * Return endpoint from Stripe onboarding, checks if onboarding has been completed
 */
router.get('/onboarded', salonRequired, async (req, res, next) => {
  try {
    // Check the user's Stripe account and check if they have finished onboarding
    if (req.stripeAccount?.details_submitted) {
      req.flash('showBanner', 'true');
    } else {
      console.log('The onboarding process was not completed.');
    }

    // Redirect to the FurEver dashboard
    res.redirect('/dashboard');
  } catch (err) {
    console.log('Failed to retrieve Stripe account information.');
    console.log(err);
    next(err);
  }
});

/**
 * GET /stripe/create-account-session
 *
 * Returns client secret from POST /v1/account_session
 */
router.get('/create-account-session', async (req, res, next) => {
  try {
    if (!req.isAuthenticated() || !req.user.stripeAccountId) {
      res.status(400);
      return res.send();
    }

    const accountSession = await stripe.accountSessions.create({
      account: req.user.stripeAccountId,
    });
    res.json({
      client_secret: accountSession.client_secret,
      publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send({error: error.message});
  }
});

/**
 * POST /stripe/payments
 *
 * Generates test payments for the logged-in salon
 * using POST /v1/payment_intents and POST /v1/payment_intents/:id/confirm.
 */
const descriptions = [
  'Full grooming package for large Labradoodle',
  'Nail trimming for toy Poodle',
  'Hydro surge warm water shampoo & conditioner for Golden Retriever',
  'Flea and tick treatments for Siamese cat',
  'Fur brushing and trimming for Argente Rabbit',
];
const customer_emails = [
  'labradoodle@stripe.com',
  'poodle@stripe.com',
  'golden_retriever@stripe.com',
  'siamese_cat@stripe.com',
  'argente_rabbit@stripe.com',
];
router.post('/payments', stripeAccountRequired, async (req, res, next) => {
  const salon = req.user;
  try {
    const account = await stripe.account.retrieve(req.user.stripeAccountId);
    const {count: inputCount, amount: inputAmount, status} = req.body;
    const count = Number(inputCount) || 1;

    await Promise.all(
      Array.from(Array(count)).map(() =>
        (async () => {
          // Note: normally, you won't create a separate customer per payment - this is only done for the purposes of this demo
          const customer = await stripe.customers.create(
            {
              email:
                customer_emails[
                  Math.floor(Math.random() * customer_emails.length)
                ],
            },
            {
              stripeAccount: account.id,
            }
          );
          await stripe.paymentIntents.create(
            {
              amount: inputAmount
                ? Math.round(inputAmount) * 100
                : getRandomInt(1000, 10000), // Use a random amount if input is not provided,
              currency: account.default_currency,
              payment_method: getPaymentMethod(status),
              description:
                descriptions[Math.floor(Math.random() * descriptions.length)],
              customer: customer.id,
              statement_descriptor: process.env.APP_NAME,
              confirmation_method: 'manual',
              confirm: true,
            },
            {
              stripeAccount: account.id,
            }
          );
        })()
      )
    );
    res.status(200);
    return res.send({});
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * POST /stripe/checkout
 *
 * Generate a payment intent for checkout with Stripe via POST /v1/paymentintent
 */
router.get('/checkout', stripeAccountRequired, async (req, res) => {
  const host = req.get('host');
  const protocol = req.protocol;
  console.log('url is', `${protocol}://${host}/dashboard`);

  let checkoutSession;
  try {
    const nameAndDescription =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    checkoutSession = await stripe.checkout.sessions.create(
      {
        line_items: [
          {
            price_data: {
              unit_amount: getRandomInt(1000, 10000), // Use a random amount if input is not provided,
              currency: 'USD',
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
        success_url: `${protocol}://${host}/dashboard`,
        cancel_url: `${protocol}://${host}/dashboard`,
      },
      {
        stripeAccount: req.user.stripeAccountId,
      }
    );

    if (!checkoutSession || !checkoutSession.url) {
      throw new Error('Session URL was not returned');
    }

    res.status(200);
    return res.send({checkoutSession: checkoutSession.url});
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * POST /stripe/payout
 *
 * Generate a payout with Stripe for the available balance via POST /v1/payouts
 */
router.post('/payout', stripeAccountRequired, async (req, res) => {
  const salon = req.user;
  try {
    // Fetch the account balance to determine the available funds
    const balance = await stripe.balance.retrieve({
      stripeAccount: salon.stripeAccountId,
    });

    // Find the first balance currency that can be paid out
    const selectedBalance = balance.available.find(({amount}) => amount > 0);
    if (selectedBalance) {
      const {amount, currency} = selectedBalance;
      await stripe.payouts.create(
        {
          amount,
          currency,
          statement_descriptor: process.env.APP_NAME,
        },
        {stripeAccount: salon.stripeAccountId}
      );
    } else {
      throw new Error(
        'You do not have any available balance to payout. Try creating a test payment in the "Dashboard" tab first.'
      );
    }
    res.status(200);
    return res.send({});
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

// Return a random int between two numbers
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;
