const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getInPersonPaymentPage = async (req, res) => {
  const invoice = await stripe.invoices.retrieve(
    req.query.invoice_id,
    {
      expand: ["payment_intent"],
    },
    { stripeAccount: req.session.accountId }
  );

  const intent = await stripe.paymentIntents.create(
    {
      amount: invoice.payment_intent.amount,
      currency: "usd",
      capture_method: "automatic",
      payment_method_types: ["card", "card_present"],
      application_fee_amount: invoice.payment_intent.application_fee_amount,
      customer: invoice.payment_intent.customer,
      description: invoice.payment_intent.description,
      metadata: { invoice: invoice.id },
    },
    { stripeAccount: req.session.accountId, expand: ["customer"] }
  );

  console.log(invoice);

  res.render("customer_payment", {
    paymentIntent: intent.id,
    customer: invoice.payment_intent.customer,
    invoice: invoice,
    client_secret: intent.client_secret,
  });
};

const getConnectionToken = async (req, res) => {
  let connectionToken = await stripe.terminal.connectionTokens.create({
    stripeAccount: req.session.accountId,
  });
  res.json({ secret: connectionToken.secret });
};

module.exports = {
  getInPersonPaymentPage,
  getConnectionToken,
};
