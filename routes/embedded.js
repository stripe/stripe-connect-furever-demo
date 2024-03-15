const { getCurrency, getCurrencySymbol } = require("./utils/currency");
const { paymentDescriptions, getCustomers } = require("./utils/fake_customers");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01; embedded_connect_beta=v1",
});

// Return a random int between two numbers
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createAccountSession = async (req, res) => {
  try {
    if (!req.session.accountId) {
      res.status(400);
      return res.send();
    }

    const accountSession = await stripe.accountSessions.create({
      account: req.session.accountId,
    });
    res.json({
      client_secret: accountSession.client_secret,
      publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    console.log("Failed to create an account session");
    console.error(error);
    res.status(500);
    res.send({ error: error.message });
  }
};

// Important: We're using static tokens based on specific test card numbers
// to trigger a special behavior. This is NOT how you would create real payments!
// You should use Stripe Elements or Stripe iOS/Android SDKs to tokenize card numbers.
// Use a static token based on a test card: https://stripe.com/docs/testing#cards
const getPaymentMethod = async (connectedAccountId, status, billingDetails) => {
  const country = billingDetails.address.country;
  let cardNumber;
  switch (status) {
    case "card_successful_intl":
      cardNumber = "4000003720000278";
      break;
    case "card_disputed_fraudulent":
      cardNumber = "4000000000000259";
      break;
    case "card_disputed_product_not_received":
      cardNumber = "4000000000002685";
      break;
    case "card_disputed_inquiry":
      cardNumber = "4000000000001976";
      break;
    default:
      switch (country) {
        case "SG":
          cardNumber = "4000007020000003";
          break;
        case "AU":
          cardNumber = "4000000360000006";
          break;
        case "FR":
          cardNumber = "4000002500000003";
          break;
        case "GB":
          cardNumber = "4000008260000000";
          break;
        default:
          cardNumber = "4000000000000077";
      }
  }

  const paymentMethod = await stripe.paymentMethods.create(
    {
      type: "card",
      card: {
        number: cardNumber,
        exp_month: 8,
        exp_year: 2024,
        cvc: "314",
      },
      billing_details: billingDetails,
    },
    {
      stripeAccount: connectedAccountId,
    }
  );
  return paymentMethod.id;
};

// This function references https://stripe.com/docs/testing#non-card-payments and is only for testing non-card payments.
// This is NOT how you would create real payments!
const createPaymentIntentForNonCardPayments = async (
  status,
  {
    amount,
    currency,
    billingDetails,
    customerId,
    description,
    connectedAccountId,
  }
) => {
  let paymentMethod;
  let paymentIntent;
  switch (status) {
    case "ach_direct_debit":
      paymentMethod = await stripe.paymentMethods.create(
        {
          type: "us_bank_account",
          billing_details: billingDetails,
          us_bank_account: {
            account_holder_type: "individual",
            account_number: "000123456789",
            routing_number: "110000000",
          },
        },
        { stripeAccount: connectedAccountId }
      );

      paymentIntent = await stripe.paymentIntents.create(
        {
          amount,
          currency,
          payment_method: paymentMethod.id,
          description,
          customer: customerId,
          statement_descriptor: process.env.APP_NAME,
          confirmation_method: "manual",
          confirm: true,
          payment_method_types: ["us_bank_account"],
          mandate_data: {
            customer_acceptance: {
              type: "offline",
            },
          },
        },
        { stripeAccount: connectedAccountId }
      );

      await stripe.paymentIntents.verifyMicrodeposits(
        paymentIntent.id,
        {
          descriptor_code: "SM11AA",
        },
        { stripeAccount: connectedAccountId }
      );
      return;

    case "sepa_debit":
      paymentMethod = await stripe.paymentMethods.create(
        {
          type: "sepa_debit",
          billing_details: {
            ...billingDetails,
            address: {
              line1: "1 Grand Canal Street Lower, Grand Canal Dock",
              city: "Dublin",
              postal_code: "D02 H210",
              country: "IE",
            },
          },
          sepa_debit: {
            iban: "IE29AIBK93115212345678",
          },
        },
        { stripeAccount: connectedAccountId }
      );

      paymentIntent = await stripe.paymentIntents.create(
        {
          amount,
          currency: "eur",
          payment_method: paymentMethod.id,
          description,
          customer: customerId,
          statement_descriptor: process.env.APP_NAME,
          confirmation_method: "manual",
          confirm: true,
          payment_method_types: ["sepa_debit"],
          mandate_data: {
            customer_acceptance: {
              type: "offline",
            },
          },
        },
        { stripeAccount: connectedAccountId }
      );
      return;
    default:
      return;
  }
};

/**
 * POST /payments
 *
 * Generates test payments for the logged-in salon
 * using POST /v1/payment_intents and POST /v1/payment_intents/:id/confirm.
 */

const createPayments = async (req, res) => {
  try {
    const account = await stripe.account.retrieve(req.session.accountId);
    const {
      count: inputCount,
      amount: inputAmount,
      status,
      currency,
    } = req.body;
    const count = Number(inputCount) || 1;

    const customers = getCustomers(req.session.country);

    await Promise.all(
      Array.from(Array(count)).map(() =>
        (async () => {
          const descriptionWithoutAddress =
            paymentDescriptions[
              Math.floor(Math.random() * paymentDescriptions.length)
            ];
          const { name, email, phone, address } =
            customers[Math.floor(Math.random() * customers.length)];
          const description = descriptionWithoutAddress + address.line1;
          const { data: existingCustomers } = await stripe.customers.list(
            {
              email,
            },
            {
              stripeAccount: account.id,
            }
          );

          let customer;
          if (existingCustomers.length > 0) {
            customer = existingCustomers[0];
          } else {
            customer = await stripe.customers.create(
              {
                name,
                email,
                address,
                phone,
              },
              {
                stripeAccount: account.id,
              }
            );
          }

          const billingDetails = { address, phone, email, name };
          const metadata = {
            amount: inputAmount
              ? Math.round(inputAmount) * 100
              : getRandomInt(8000, 20000), // Use a random amount if input is not provided between 80 and 200.
            currency:
              status.startsWith("card_successful") && currency
                ? currency
                : account.default_currency,
            billingDetails,
            customerId: customer.id,
            description,
            connectedAccountId: account.id,
          };

          if (status.startsWith("card_")) {
            const paymentMethodToken = await getPaymentMethod(
              account.id,
              status,
              billingDetails
            );
            await stripe.paymentIntents.create(
              {
                amount: metadata.amount,
                currency: metadata.currency,
                payment_method: paymentMethodToken,
                description,
                customer: metadata.customerId,
                statement_descriptor: "Homebox",
                confirmation_method: "manual",
                receipt_email: email,
                confirm: true,
                ...(status === "card_uncaptured"
                  ? {
                      capture_method: "manual", // https://stripe.com/docs/payments/place-a-hold-on-a-payment-method
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
    res.status(200);
    return res.send({});
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.send({ error: error.message });
  }
};

/**
 * POST /payouts
 *
 * Generate a payout with Stripe for the available balance via POST /v1/payouts
 */
const createPayouts = async (req, res) => {
  try {
    // Fetch the account balance to determine the available funds
    const balance = await stripe.balance.retrieve({
      stripeAccount: req.session.accountId,
    });

    // Find the first balance currency that can be paid out
    const availableBalance = balance.available.find(({ amount }) => amount > 0);
    if (availableBalance) {
      const { amount, currency } = availableBalance;
      const pendingBalance = balance.pending.find(
        ({ currency: pendingCurrency }) => pendingCurrency === currency
      );
      const payoutAmount =
        pendingBalance.amount >= 0 ? amount : amount + pendingBalance.amount;
      await stripe.payouts.create(
        {
          amount: Math.min(1000, payoutAmount),
          currency,
          statement_descriptor: process.env.APP_NAME,
        },
        { stripeAccount: req.session.accountId }
      );
    } else {
      throw new Error(
        'You do not have any available balance to payout. Create a test payment in the "Payments" tab first with the "Successful" status to immediately add funds to your account.'
      );
    }
    res.status(200);
    return res.send({});
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.send({ error: error.message });
  }
};

/**
 * POST /interventions
 *
 * Generates test intervention for the logged-in salon. This is only used for testing purposes
 */
const merchantIssueResource = stripe.StripeResource.extend({
  create: stripe.StripeResource.method({
    method: "POST",
    path: "/test_helpers/demo/merchant_issue",
  }),
});
const createInterventions = async (req, res) => {
  try {
    await new merchantIssueResource(stripe).create({
      account: req.session.accountId,
      issue_type: "additional_info",
    });
    res.status(200);
    return res.send({});
  } catch (error) {
    console.log(error);
    res.status(500);
    return res.send({ error: error.message });
  }
};

const getPaymentsPage = async (req, res) => {
  try {
    const month = new Date().toLocaleString("default", { month: "long" });
    const account = await stripe.accounts.retrieve(req.session.accountId);
    res.render("payments", {
      chargesEnabled: !!account?.charges_enabled,
      currency: getCurrency(req.session.country).toUpperCase(),
      currencySymbol: getCurrencySymbol(req.session.country),
      month,
    });
  } catch (err) {
    res.render("error", { error: err.message, routeName: "Payments" });
  }
};

const getPayoutsPage = async (req, res) => {
  try {
    const account = await stripe.accounts.retrieve(req.session.accountId);
    res.render("payouts", { payoutsEnabled: !!account?.payouts_enabled });
  } catch (err) {
    res.render("error", { error: err.message, routeName: "Payouts" });
  }
};

const getAccountPage = async (req, res) => {
  try {
    const account = await stripe.accounts.retrieve(req.session.accountId);
    res.render("account", { interventionsEnabled: account.details_submitted });
  } catch (err) {
    res.render("error", { error: err.message, routeName: "Account" });
  }
};

module.exports = {
  createAccountSession,
  createInterventions,
  createPayments,
  createPayouts,
  getAccountPage,
  getPaymentsPage,
  getPayoutsPage,
};
