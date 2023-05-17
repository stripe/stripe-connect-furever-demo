import dotenv from 'dotenv';
import express from 'express';
import Stripe from 'stripe';
import {userRequired, stripeAccountRequired} from './middleware.js';

dotenv.config({path: './.env'});

// We are including the beta headers for Connect embedded components and Unified accounts
const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01; embedded_connect_beta=v1;unified_accounts_beta=v1',
});

const router = express.Router();

// Important: We're using static tokens based on specific test card numbers
// to trigger a special behavior. This is NOT how you would create real payments!
// You should use Stripe Elements or Stripe iOS/Android SDKs to tokenize card numbers.
// Use a static token based on a test card: https://stripe.com/docs/testing#cards
const getPaymentMethod = (status) => {
  switch (status) {
    case 'card_successful':
      return 'pm_card_bypassPending';
    case 'card_successful_intl':
      return 'pm_card_bypassPendingInternational';
    case 'card_disputed_fraudulent':
      return 'pm_card_createDispute';
    case 'card_disputed_product_not_received':
      return 'pm_card_createDisputeProductNotReceived';
    case 'card_disputed_inquiry':
      return 'pm_card_createDisputeInquiry';
    default:
      return 'pm_card_bypassPending';
  }
};

// This function references https://stripe.com/docs/testing#non-card-payments and is only for testing non-card payments.
// This is NOT how you would create real payments!
const createPaymentIntentForNonCardPayments = async (
  status,
  {amount, currency, name, email, customerId, description, connectedAccountId}
) => {
  let paymentMethod;
  let paymentIntent;
  switch (status) {
    case 'ach_direct_debit':
      paymentMethod = await stripe.paymentMethods.create(
        {
          type: 'us_bank_account',
          billing_details: {
            address: {
              line1: '354 Oyster Point Boulevard',
              city: 'South San Francisco',
              postal_code: '94080',
              state: 'CA',
              country: 'US',
            },
            name,
            email,
          },
          us_bank_account: {
            account_holder_type: 'individual',
            account_number: '000123456789',
            routing_number: '110000000',
          },
        },
        {stripeAccount: connectedAccountId}
      );

      paymentIntent = await stripe.paymentIntents.create(
        {
          amount,
          currency,
          payment_method: paymentMethod.id,
          description,
          customer: customerId,
          statement_descriptor: process.env.APP_NAME,
          confirmation_method: 'manual',
          confirm: true,
          payment_method_types: ['us_bank_account'],
          mandate_data: {
            customer_acceptance: {
              type: 'offline',
            },
          },
        },
        {stripeAccount: connectedAccountId}
      );

      await stripe.paymentIntents.verifyMicrodeposits(
        paymentIntent.id,
        {
          descriptor_code: 'SM11AA',
        },
        {stripeAccount: connectedAccountId}
      );
      return;

    case 'sepa_debit':
      paymentMethod = await stripe.paymentMethods.create(
        {
          type: 'sepa_debit',
          billing_details: {
            address: {
              line1: '1 Grand Canal Street Lower, Grand Canal Dock',
              city: 'Dublin',
              postal_code: 'D02 H210',
              country: 'IE',
            },
            name,
            email,
          },
          sepa_debit: {
            iban: 'IE29AIBK93115212345678',
          },
        },
        {stripeAccount: connectedAccountId}
      );

      paymentIntent = await stripe.paymentIntents.create(
        {
          amount,
          currency: 'eur',
          payment_method: paymentMethod.id,
          description,
          customer: customerId,
          statement_descriptor: process.env.APP_NAME,
          confirmation_method: 'manual',
          confirm: true,
          payment_method_types: ['sepa_debit'],
          mandate_data: {
            customer_acceptance: {
              type: 'offline',
            },
          },
        },
        {stripeAccount: connectedAccountId}
      );
      return;
    default:
      return;
  }
};

function getAccountParams(accountConfiguration) {
  let type = undefined;
  let capabilities = {
    card_payments: {
      requested: true,
    },
    transfers: {
      requested: true,
    },
  };
  let controller = undefined;
  switch (accountConfiguration) {
    case 'no_dashboard_poll':
      type = 'custom';
      controller = undefined;
      break;
    case 'no_dashboard_soll':
      controller = {
        application: {
          loss_liable: false, // Stripe owns loss liability
          onboarding_owner: false, // Stripe is the onboarding owner
          pricing_controls: true, // The platform is the pricing owner
        },
        dashboard: {
          type: 'none', // The connected account will not have access to dashboard
        },
      };
      break;
    case 'dashboard_soll':
      capabilities = undefined;
      controller = {
        application: {
          loss_liable: true, // Platform owns loss liability
          onboarding_owner: false, // Stripe is the onboarding owner
          pricing_controls: true, // The platform is the pricing owner
        },
        dashboard: {
          type: 'full', // Standard dash
        },
      };
      break;
    default:
      throw new Error('Invalid account configuration');
  }

  return {
    type,
    controller,
    capabilities,
  };
}

/**
 * POST /stripe/create-account
 *
 * Create a Stripe account via POST /v1/accounts
 */
router.post('/create-account', userRequired, async (req, res, next) => {
  // Generate a random string as `state` to protect from CSRF and include it in the session
  req.session.state = Math.random().toString(36).slice(2);

  try {
    const salon = req.user;
    salon.set(req.body); // Try to update the logged-in salon using the newly entered profile data
    await salon.save();

    let accountId = req.user.stripeAccountId;

    let businessType = undefined;
    if (req.user.type === 'company' || req.user.type === 'individual') {
      businessType = req.user.type;
    }

    const shouldPrefill = req.body.prefill;
    const accountConfiguration = req.body.accountConfiguration;

    // Create a Stripe account for this user if one does not exist already
    if (accountId == undefined) {
      let bankAccount;
      if (shouldPrefill) {
        bankAccount = await stripe.tokens.create({
          bank_account: {
            country: 'US',
            currency: 'usd',
            account_holder_name: `${req.user.firstName} ${req.user.lastName}`,
            account_holder_type: businessType,
            routing_number: '110000000',
            account_number: '000123456789',
          },
        });
      }

      const accountConfigParams = getAccountParams(accountConfiguration);

      // Define the parameters to create a new Stripe account with
      let accountParams = {
        ...accountConfigParams,
        country: req.user.country || undefined,
        email: req.user.email || undefined,
        // Prefill bank account information
        ...(bankAccount
          ? {
              external_account: bankAccount.id,
            }
          : {}),
        business_profile: {
          name: req.user.salon.name,
          // Prefill business profile
          ...(shouldPrefill
            ? {
                mcc: '7299',
                url: 'https://furever.dev',
                name: 'FurEver company',
                product_description: 'Products for pets',
                support_address: {
                  line1: '354 Oyster Point Blvd',
                  city: 'South San Francisco',
                  state: 'CA',
                  postal_code: '94080',
                },
                support_email: req.user.email,
                support_phone: '0000000000',
                support_url: 'https://furever.dev',
                url: 'https://furever.dev',
              }
            : {}),
        },
        business_type: businessType,
        ...(shouldPrefill
          ? {
              settings: {
                card_payments: {
                  statement_descriptor_prefix: 'FurEver',
                },
                payments: {
                  statement_descriptor: 'FurEver',
                },
              },
            }
          : {}),
      };
      if (businessType === 'company') {
        accountParams = Object.assign(accountParams, {
          company: {
            name: req.user.salon.name || undefined,
            // Prefill company information
            ...(shouldPrefill
              ? {
                  address: {
                    line1: 'address_full_match',
                    city: 'South San Francisco',
                    country: 'US',
                    state: 'CA',
                    postal_code: '94080',
                  },
                  directors_provided: true,
                  executives_provided: true,
                  owners_provided: true,
                  phone: '0000000000',
                  tax_id: '000000000',
                }
              : {}),
          },
        });
      } else if (businessType === 'individual') {
        accountParams = Object.assign(accountParams, {
          individual: {
            first_name: req.user.firstName || undefined,
            last_name: req.user.lastName || undefined,
            email: req.user.email || undefined,
            // Prefill individual information
            ...(shouldPrefill
              ? {
                  address: {
                    line1: 'address_full_match',
                    city: 'South San Francisco',
                    country: 'US',
                    state: 'CA',
                    postal_code: '94080',
                  },
                  dob: {
                    day: 1,
                    month: 1,
                    year: 1901,
                  },
                  phone: '0000000000',
                  ssn_last_4: '0000',
                }
              : {}),
          },
        });
      }
      const account = await stripe.accounts.create(accountParams);
      accountId = account.id;
      // Update the model and store the Stripe account ID in the datastore:
      // this Stripe account ID will be used to issue payouts to the salon
      req.user.stripeAccountId = accountId;
      await req.user.save();

      // Prefill Person object
      if (shouldPrefill && businessType === 'company') {
        await stripe.accounts.createPerson(accountId, {
          first_name: req.user.firstName,
          last_name: req.user.lastName,
          address: {
            line1: 'address_full_match',
            city: 'South San Francisco',
            country: 'US',
            state: 'CA',
            postal_code: '94080',
          },
          dob: {
            day: 1,
            month: 1,
            year: 1901,
          },
          email: req.user.email,
          phone: '0000000000',
          ssn_last_4: '0000',
          relationship: {
            director: false,
            executive: true,
            owner: true,
            percent_ownership: 50,
            representative: true,
            title: 'CEO',
          },
        });
      }
    }

    return res.status(200).end();
  } catch (error) {
    console.error(`Failed to create a Stripe account: ${error}`);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * POST /stripe/create-account-session
 *
 * Returns client secret from POST /v1/account_session
 */
router.post(
  '/create-account-session',
  stripeAccountRequired,
  async (req, res, next) => {
    try {
      const accountSession = await stripe.accountSessions.create({
        account: req.user.stripeAccountId,
      });
      res.json({
        client_secret: accountSession.client_secret,
        publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
      });
    } catch (error) {
      console.error('Failed to create an account session: ', error);
      res.status(500);
      return res.send({error: error.message});
    }
  }
);

/**
 * POST /stripe/create-intervention
 *
 * Generates test intervention for the logged-in salon. This is only used for testing purposes
 */
const merchantIssueResource = stripe.StripeResource.extend({
  create: stripe.StripeResource.method({
    method: 'POST',
    path: '/test_helpers/demo/merchant_issue',
  }),
});

router.post(
  '/create-intervention',
  stripeAccountRequired,
  async (req, res, next) => {
    try {
      const interventionResponse = await new merchantIssueResource(
        stripe
      ).create({
        account: req.user.stripeAccountId,
        issue_type: 'additional_info',
      });

      res.send(interventionResponse);
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  }
);

/**
 * POST /stripe/create-payments
 *
 * Generates test payments for the logged-in salon
 * using POST /v1/payment_intents and POST /v1/payment_intents/:id/confirm.
 */
const customers = [
  {
    email: 'labradoodle@stripe.com',
    name: 'Odie',
    description: 'Full grooming package for large Labradoodle',
  },
  {
    email: 'poodle@stripe.com',
    name: 'Snoopy ',
    description: 'Nail trimming for toy Poodle',
  },
  {
    email: 'golden_retriever@stripe.com',
    name: 'Dug',
    description:
      'Hydro surge warm water shampoo & conditioner for Golden Retriever',
  },
  {
    email: 'siamese_cat@stripe.com',
    name: 'Garfield',
    description: 'Flea and tick treatments for Siamese cat',
  },
  {
    email: 'argente_rabbit@stripe.com',
    name: 'Bugs Bunny',
    description: 'Fur brushing and trimming for Argente Rabbit',
  },
];
router.post('/create-payments', stripeAccountRequired, async (req, res) => {
  try {
    const account = await stripe.account.retrieve(req.user.stripeAccountId);
    const {count: inputCount, amount: inputAmount, status, currency} = req.body;
    const count = Number(inputCount) || 1;

    await Promise.all(
      Array.from(Array(count)).map(() =>
        (async () => {
          const {name, email, description} =
            customers[Math.floor(Math.random() * customers.length)];
          // Note: normally, you won't create a separate customer per payment - this is only done for the purposes of this demo
          const customer = await stripe.customers.create(
            {
              email,
            },
            {
              stripeAccount: account.id,
            }
          );

          const metadata = {
            amount: inputAmount
              ? Math.round(inputAmount) * 100
              : getRandomInt(1000, 10000), // Use a random amount if input is not provided,
            currency:
              status.startsWith('card_successful') && currency
                ? currency
                : account.default_currency,
            name,
            email,
            customerId: customer.id,
            description,
            connectedAccountId: account.id,
          };

          if (status.startsWith('card_')) {
            await stripe.paymentIntents.create(
              {
                amount: metadata.amount,
                currency: metadata.currency,
                payment_method: getPaymentMethod(status),
                description,
                customer: metadata.customerId,
                statement_descriptor: process.env.APP_NAME,
                confirmation_method: 'manual',
                confirm: true,
                ...(status === 'card_uncaptured'
                  ? {
                      capture_method: 'manual', // https://stripe.com/docs/payments/place-a-hold-on-a-payment-method
                    }
                  : {}),
              },
              {
                stripeAccount: account.id,
              }
            );
          } else {
            await createPaymentIntentForNonCardPayments(status, metadata);
          }
        })()
      )
    );
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * POST /stripe/create-checkout-session
 *
 * Generate a payment intent for checkout with Stripe via POST /v1/paymentintent
 */
router.post(
  '/create-checkout-session',
  stripeAccountRequired,
  async (req, res) => {
    const host = req.get('host');
    const protocol = req.protocol;
    console.log('url is', `${protocol}://${host}/payments`);

    let checkoutSession;
    try {
      const {description: nameAndDescription} =
        customers[Math.floor(Math.random() * customers.length)];
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
          success_url: `${protocol}://${host}/payments`,
          cancel_url: `${protocol}://${host}/payments`,
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
      console.error(error);
      res.status(500);
      return res.send({error: error.message});
    }
  }
);

/**
 * POST /stripe/create-payout
 *
 * Generate a payout with Stripe for the available balance via POST /v1/payouts
 */
router.post('/create-payout', stripeAccountRequired, async (req, res) => {
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
          amount: Math.min(amount, 1000), // We allow a max of 10 dlls to be paid out in this test app
          currency,
          statement_descriptor: process.env.APP_NAME,
        },
        {stripeAccount: salon.stripeAccountId}
      );
    } else {
      throw new Error(
        'You do not have any available balance to payout. Create a test payment in the "Payments" tab first with the "Successful" status to immediately add funds to your account.'
      );
    }
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * GET /stripe/onboarded
 *
 * Returns a boolean indicating whether onboarding has been completed
 */
router.get('/onboarded', stripeAccountRequired, async (req, res) => {
  try {
    const stripeAccount = await retrieveStripeAccount(req.user.stripeAccountId);
    return res
      .status(200)
      .send({onboarded: !!stripeAccount?.details_submitted});
  } catch (error) {
    console.error(error);
    return res.status(500).res.send({onboarded: false, error: error.message});
  }
});

// Return a random int between two numbers
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default router;
