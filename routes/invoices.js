const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  appInfo: {
    name: "stripe-demos/homebox-baas",
    version: "1.0.0",
    url: "https://stripe-demo-homebox-baas.onrender.com/"
  }
});
const { applicationFee } = require('../demo.config');


const updateInvoice = async (req, res) => {
  try {
    const {
      session: { accountId },
      body: { paymentIntent},
    } = req;

    const invoice = await stripe.invoices.pay(
      paymentIntent.metadata.invoice,
      {
        paid_out_of_band: true
      },
      { stripeAccount: accountId }
    );

    res.json({invoice:invoice});
  }
  catch (err) {
    next(err);
  }
};

const createInvoice = async (req, res, next) => {
  try {
    const {
      session: { accountId },
      body: { services, description, customerId },
    } = req;

    const retreivedPrices = await Promise.all(
      Object.keys(services).map((priceId) => {
        return stripe.prices.retrieve(priceId, { stripeAccount: accountId });
      })
    );

    // creating an invoice item for each service
    // NOTE: All created invoice items will be added to single invoice
    const invoiceItems = await Promise.all(
      retreivedPrices.map((price) => {
        return stripe.invoiceItems.create(
          {
            customer: customerId,
            price: price.id,
            quantity: services[price.id],
          },
          { stripeAccount: accountId }
        );
      })
    );

    let createdInvoice;
    try {
      createdInvoice = await stripe.invoices.create(
        {
          customer: customerId,
          collection_method: 'send_invoice',
          days_until_due: 7,
          description,
          pending_invoice_items_behavior: 'include',
         /* payment_settings:{
            payment_method_types: ['card_present', 'ach_credit_transfer','card', 'wechat_pay']
          }*/
        },
        {
          stripeAccount: accountId,
        }
      );
      createdInvoice = await stripe.invoices.update(
        createdInvoice.id,
        {
          application_fee_amount: createdInvoice.total * applicationFee,
        },
        {
          stripeAccount: accountId,
        }
      );

      await stripe.invoices.finalizeInvoice(createdInvoice.id, { stripeAccount: accountId });
    } catch (err) {
      if (createdInvoice) {
        stripe.invoices.del(createdInvoice.id).catch(() => {});
      }

      Promise.all(
        invoiceItems.map((invoiceItem) => {
          return stripe.invoiceItems.del(invoiceItem.id, {
            stripeAccount: accountId,
          });
        })
      );

      throw new Error(err.message);
    }

    res.json(createdInvoice);
  } catch (err) {
    next(err);
  }
};

const setVoidStatusToInvoice = async (req, res, next) => {
  try {
    const {
      session: { accountId },
      params: { invoiceId },
    } = req;

    const invoice = await stripe.invoices.voidInvoice(invoiceId, { stripeAccount: accountId });

    if (req.accepts('html')) {
      return res.render('partials/invoice', { layout: false, ...invoice });
    }

    res.json(invoice);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createInvoice,
  updateInvoice,
  setVoidStatusToInvoice,
};
