import dotenv from 'dotenv';
import express, {Request} from 'express';
import {
  userRequired,
  stripeAccountRequired,
  retrieveStripeAccount,
} from './middleware.js';
import {stripe} from './stripeSdk.js';
import Stripe from 'stripe';
import {staticCurrencyPaymentMethods} from '../../shared/staticCurrencies.js';

dotenv.config({path: './.env'});

const app = express.Router();

// Important: We're using static tokens based on specific test card numbers
// to trigger a special behavior. This is NOT how you would create real payments!
// You should use Stripe Elements or Stripe iOS/Android SDKs to tokenize card numbers.
// Use a static token based on a test card: https://stripeSdk.com/docs/testing#cards
const getPaymentMethod = (status: string) => {
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

// This function references https://stripeSdk.com/docs/testing#non-card-payments and is only for testing non-card payments.
// This is NOT how you would create real payments!
const createPaymentIntentForNonCardPayments = async (
  status: string,
  {
    amount,
    currency,
    name,
    email,
    customerId,
    description,
    connectedAccountId,
  }: {
    amount: number;
    currency: string;
    name: string;
    email: string;
    customerId: string;
    description: string;
    connectedAccountId: string;
  }
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

function getAccountParams(
  accountConfiguration: string
): Stripe.AccountCreateParams {
  let type: Stripe.Account.Type | undefined = undefined;
  let capabilities: Stripe.AccountCreateParams.Capabilities | undefined = {
    card_payments: {
      requested: true,
    },
    transfers: {
      requested: true,
    },
  };
  let controller: Stripe.AccountCreateParams.Controller | undefined = undefined;
  switch (accountConfiguration) {
    case 'no_dashboard_poll':
      controller = {
        losses: {
          payments: 'application', // platform owns loss liability
        },
        requirement_collection: 'application', // platform is onboarding owner
        fees: {
          payer: 'application', // The platform is the pricing owner
        },
        stripe_dashboard: {
          type: 'none', // The connected account will not have access to dashboard
        },
      };
      break;
    case 'dashboard_soll':
      capabilities = undefined;
      controller = {
        losses: {
          payments: 'stripe', // Stripe owns loss liability
        },
        requirement_collection: 'stripe', // Stripe is onboarding owner
        fees: {
          payer: 'account', // Stripe is the pricing owner
        },
        stripe_dashboard: {
          type: 'full', // Standard dashboard
        },
      };
      break;
    case 'no_dashboard_soll':
      controller = {
        losses: {
          payments: 'stripe', // stripe owns loss liability
        },
        requirement_collection: 'stripe', // stripe is onboarding owner
        fees: {
          payer: 'application', // The platform is the pricing owner
        },
        stripe_dashboard: {
          type: 'none', // The connected account will not have access to dashboard
        },
      };
      break;
    default:
      throw new Error('Invalid account configuration:' + accountConfiguration);
  }

  return {
    type,
    controller,
    capabilities,
  };
}

interface Test extends Request {
  user: Express.User;
}

/**
 * POST /create-account
 *
 * Create a Stripe account via POST /v1/accounts
 */
app.post('/create-account', userRequired, async (req, res) => {
  try {
    const user = req.user!;
    user.set(req.body); // Try to update the logged-in salon using the newly entered profile data
    await user.save();

    let accountId = user.stripeAccountId;

    let businessType = undefined;
    if (user.type === 'company' || user.type === 'individual') {
      businessType = user.type;
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
            account_holder_name: `${user.firstName} ${user.lastName}`,
            account_holder_type: businessType,
            routing_number: '110000000',
            account_number: '000123456789',
          },
        });
      }

      const accountConfigParams = getAccountParams(accountConfiguration);

      // Define the parameters to create a new Stripe account with
      let accountParams: Stripe.AccountCreateParams = {
        ...accountConfigParams,
        country: user.country || undefined,
        email: user.email || undefined,
        // Prefill bank account information
        ...(bankAccount
          ? {
              external_account: bankAccount.id,
            }
          : {}),
        business_profile: {
          name: user.salon.name,
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
                support_email: user.email,
                support_phone: '8888675309',
                support_url: 'https://furever.dev',
                estimated_worker_count: 10,
                annual_revenue: {
                  amount: 1000000,
                  currency: 'usd',
                  fiscal_year_end: '2023-12-31',
                },
              }
            : {}),
        },
        business_type: businessType,
      };
      if (businessType === 'company') {
        accountParams = Object.assign(accountParams, {
          company: {
            name: user.salon.name || undefined,
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
                  phone: '8888675309',
                  tax_id: '000000000',
                }
              : {}),
          },
        });
      } else if (businessType === 'individual') {
        accountParams = Object.assign(accountParams, {
          individual: {
            first_name: user.firstName || undefined,
            last_name: user.lastName || undefined,
            email: user.email || undefined,
            // Prefill individual information
            ...(shouldPrefill
              ? {
                  id_number: '000000000',
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
                  phone: '8888675309',
                  ssn_last_4: '0000',
                }
              : {}),
          },
          ...(shouldPrefill
            ? {
                company: {
                  tax_id: '000000000', // There is a bug where prefilling id_number for individual is not working
                  name: 'Jenny Rosen', // There is a bug with prefilling that also requires this field for GS
                },
              }
            : {}),
        });
      }
      const account = await stripe.accounts.create(accountParams);
      accountId = account.id;
      // Update the model and store the Stripe account ID in the datastore:
      // this Stripe account ID will be used to issue payouts to the salon
      user.stripeAccountId = accountId;
      await user.save();

      // Prefill Person object
      if (shouldPrefill && businessType === 'company') {
        await stripe.accounts.createPerson(accountId, {
          first_name: user.firstName,
          last_name: user.lastName,
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
          email: user.email,
          phone: '8888675309',
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
  } catch (error: any) {
    console.error(`Failed to create a Stripe account: ${error}`);
    return res.status(500).send({error: error.message});
  }
});

function getStripeAccountId(req: any) {
  const user = req.user!;
  return user.stripeAccountId;
}

/**
 * POST /account_session
 *
 * Returns client secret from POST /v1/account_session
 */
app.post('/account_session', stripeAccountRequired, async (req, res) => {
  try {
    // This should contain a list of all components used in FurEver
    const accountSessionComponentsParams: Stripe.AccountSessionCreateParams.Components =
      {
        account_management: {
          enabled: true,
        },
        account_onboarding: {
          enabled: true,
        },
        notification_banner: {
          enabled: true,
        },
        payments: {
          enabled: true,
        },
        payouts: {
          enabled: true,
        },
        issuing_cards_list: {
          enabled: true,
          features: {
            card_management: true,
            cardholder_management: true,
          },
        },
        financial_account: {
          enabled: true,
          features: {
            money_movement: true,
          },
        },
        financial_account_transactions: {
          enabled: true,
          features: {
            card_spend_dispute_management: true,
          },
        },
        tax_settings: {
          enabled: true,
        },
        tax_registrations: {
          enabled: true,
        },
      };

    // TODO: Move up once payment_method_settings is in the beta SDK
    const accountSessionComponentsParamsAsAny =
      accountSessionComponentsParams as any;
    accountSessionComponentsParamsAsAny.payment_method_settings = {
      enabled: true,
    };

    const accountSession = await stripe.accountSessions.create({
      account: getStripeAccountId(req),
      components: accountSessionComponentsParamsAsAny,
    });
    res.json({
      client_secret: accountSession.client_secret,
    });
  } catch (error: any) {
    console.error('Failed to create an account session: ', error);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * POST /create-intervention
 *
 * Generates test intervention for the logged-in salon. This is only used for testing purposes
 */
const merchantIssueResource = Stripe.StripeResource.extend({
  create: Stripe.StripeResource.method({
    method: 'POST',
    path: '/test_helpers/demo/merchant_issue',
  }) as (...args: any[]) => Promise<Stripe.Response<object>>,
});

app.post('/create-intervention', stripeAccountRequired, async (req, res) => {
  try {
    const user = req.user!;
    const interventionResource = new merchantIssueResource(stripe);
    const interventionResponse = await interventionResource.create({
      account: user.stripeAccountId,
      issue_type: 'additional_info',
    });

    res.send(interventionResponse);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

/**
 * POST /create-payments
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
app.post('/create-payments', stripeAccountRequired, async (req, res) => {
  try {
    const user = req.user!;
    const account = await stripe.accounts.retrieve(user.stripeAccountId);
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
              !staticCurrencyPaymentMethods.includes(status) && currency
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
                payment_method_types: ['card'],
                description,
                customer: metadata.customerId,
                statement_descriptor: process.env.APP_NAME,
                confirmation_method: 'manual',
                confirm: true,
                ...(status === 'card_uncaptured'
                  ? {
                      capture_method: 'manual', // https://stripeSdk.com/docs/payments/place-a-hold-on-a-payment-method
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
  } catch (error: any) {
    console.error(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * POST /create-checkout-session
 *
 * Generate a payment intent for checkout with Stripe via POST /v1/paymentintent
 */
app.post(
  '/create-checkout-session',
  stripeAccountRequired,
  async (req, res) => {
    const user = req.user!;
    const host = req.get('host');
    const protocol = req.protocol;

    const account = await stripe.accounts.retrieve(user.stripeAccountId);

    const taxSettings = await stripe.tax.settings.retrieve({
      stripeAccount: user.stripeAccountId,
    });
    const automaticTaxEnabled = taxSettings.status === 'active';
    const taxCode = taxSettings.defaults.tax_code
      ? taxSettings.defaults.tax_code
      : 'txcd_99999999';

    const {
      amount,
      currency,
      redirectUrl = `${protocol}://${host}/payments`,
    } = req.body;

    console.log('url is', redirectUrl);

    let checkoutSession;
    try {
      const {description: nameAndDescription} =
        customers[Math.floor(Math.random() * customers.length)];
      checkoutSession = await stripe.checkout.sessions.create(
        {
          line_items: [
            {
              price_data: {
                unit_amount: amount
                  ? Math.round(amount) * 100
                  : getRandomInt(4000, 10000), // Use a random amount if input is not provided
                currency: currency || account.default_currency,
                product_data: {
                  name: nameAndDescription,
                  description: nameAndDescription,
                  tax_code: automaticTaxEnabled ? taxCode : undefined,
                },
                tax_behavior: automaticTaxEnabled ? 'exclusive' : undefined,
              },
              quantity: 1,
            },
          ],
          payment_intent_data: {
            description: nameAndDescription,
            statement_descriptor: process.env.APP_NAME,
          },
          automatic_tax: {
            enabled: automaticTaxEnabled,
          },
          mode: 'payment',
          success_url: redirectUrl,
          cancel_url: redirectUrl,
        },
        {
          stripeAccount: user.stripeAccountId,
        }
      );

      if (!checkoutSession || !checkoutSession.url) {
        throw new Error('Session URL was not returned');
      }

      res.status(200);
      return res.send({checkoutSession: checkoutSession.url});
    } catch (error: any) {
      console.error(error);
      res.status(500);
      return res.send({error: error.message});
    }
  }
);

/**
 * POST /create-payout
 *
 * Generate a payout with Stripe for the available balance via POST /v1/payouts
 */
app.post('/create-payout', stripeAccountRequired, async (req, res) => {
  const user = req.user!;
  try {
    // Fetch the account balance to determine the available funds
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripeAccountId,
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
        {stripeAccount: user.stripeAccountId}
      );
    } else {
      throw new Error(
        'You do not have any available balance to payout. Create a test payment in the "Payments" tab first with the "Successful" status to immediately add funds to your account.'
      );
    }
    return res.status(200).end();
  } catch (error: any) {
    console.error(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * POST /create-received-credit
 *
 * Generate a received credit applied to the FinancialAccount.
 */
app.post('/create-received-credit', stripeAccountRequired, async (req, res) => {
  const user = req.user!;
  try {
    await stripe.testHelpers.treasury.receivedCredits.create(
      {
        amount: 1000,
        currency: 'usd',
        financial_account: req.body.financial_account,
        network: 'ach',
      },
      {
        stripeAccount: user.stripeAccountId,
      }
    );
    return res.status(200).end();
  } catch (error: any) {
    console.error(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * GET /onboarded
 *
 * Returns a boolean indicating whether onboarding has been completed
 */
app.get('/onboarded', stripeAccountRequired, async (req, res) => {
  try {
    const user = req.user!;
    const stripeAccount = await retrieveStripeAccount(user.stripeAccountId);
    return res
      .status(200)
      .send({onboarded: !!stripeAccount?.details_submitted});
  } catch (error: any) {
    console.error(error);
    return res.status(500).send({onboarded: false, error: error.message});
  }
});

/**
 * POST /create-bank-account
 *
 * Creates a bank account token and attaches it to the connected account. Note this will only work for a custom account
 */
app.post('/create-bank-account', stripeAccountRequired, async (req, res) => {
  const user = req.user!;
  const {
    country,
    currency,
    account_holder_name,
    account_holder_type,
    routing_number,
    account_number,
  } = req.body;
  try {
    const token = await stripe.tokens.create(
      {
        bank_account: {
          country: country,
          currency: currency,
          account_holder_name: account_holder_name,
          account_holder_type: account_holder_type,
          routing_number: routing_number,
          account_number: account_number,
        },
      },
      {
        stripeAccount: user.stripeAccountId,
      }
    );

    if (!token) {
      throw new Error('Token was not returned');
    }
    await stripe.accounts.createExternalAccount(user.stripeAccountId, {
      external_account: token.id,
    });

    return res.status(200).end();
  } catch (error: any) {
    console.error(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * POST /request-capabilities
 *
 * Enables requesting the specified capabilities.
 */
app.post('/request-capabilities', stripeAccountRequired, async (req, res) => {
  const user = req.user!;
  const {capabilities} = req.body;

  try {
    await stripe.accounts.update(user.stripeAccountId, {
      capabilities,
    });

    // If the user requested Treasury, create a financial account if none exists
    if (capabilities.treasury?.requested) {
      const financialAccounts = await stripe.treasury.financialAccounts.list(
        {
          limit: 1,
        },
        {
          stripeAccount: user.stripeAccountId,
        }
      );

      if (financialAccounts.data.length === 0) {
        await stripe.treasury.financialAccounts.create(
          {
            supported_currencies: ['usd'],
            features: {
              card_issuing: {requested: true},
              deposit_insurance: {requested: true},
              financial_addresses: {aba: {requested: true}},
              inbound_transfers: {ach: {requested: true}},
              intra_stripe_flows: {requested: true},
              outbound_payments: {
                ach: {requested: true},
                us_domestic_wire: {requested: true},
              },
              outbound_transfers: {
                ach: {requested: true},
                us_domestic_wire: {requested: true},
              },
            },
          },
          {stripeAccount: user.stripeAccountId}
        );
      }
    }

    return res.status(200).end();
  } catch (error: any) {
    console.error(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

/**
 * GET /financial-account
 *
 * Returns the first financial account for the connected account.
 * Multi-FA support is only limited to a subset of users, so we'll
 * just return the first one for simplicity.
 */
app.get('/financial-account', stripeAccountRequired, async (req, res) => {
  const user = req.user!;

  try {
    const financialAccounts = await stripe.treasury.financialAccounts.list(
      {
        limit: 3,
      },
      {
        stripeAccount: user.stripeAccountId,
      }
    );

    if (financialAccounts.data.length === 0) {
      console.error('No financial accounts found for user');
      res.status(400);
      return res.send({error: 'No financial accounts found for user'});
    }

    res.json({
      financial_account: financialAccounts.data[0].id,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500);
    return res.send({error: error.message});
  }
});

// Return a random int between two numbers
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default app;
