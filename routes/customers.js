const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const faker = require("faker");

const { addresses } = require("../demo.config");

const getCustomers = async (req, res) => {
  try {
    const customers = [];

    const {
      session: { accountId },
    } = req;

    for await (const customer of stripe.customers.list(
      { limit: 100 },
      { stripeAccount: accountId }
    )) {
      customers.push(customer);
    }

    res.render("customers", {
      customers: customers,
    });
  } catch (err) {
    res.render("error", { error: err.message, routeName: "Customers" });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const {
      params: { customerId },
      session: { accountId },
    } = req;

    const [invoices, customer, services] = await Promise.all([
      stripe.invoices.list(
        { customer: customerId, limit: 100 },
        { stripeAccount: accountId }
      ),
      stripe.customers.retrieve(customerId, { stripeAccount: accountId }),
      stripe.products.list(
        { limit: 100, active: true },
        { stripeAccount: accountId }
      ),
    ]);

    const finalizedInvoices = invoices.data.filter(
      (el) => el.hosted_invoice_url
    );
    res.render("customer_details", {
      customer,
      invoices: finalizedInvoices,
      services: services.data,
    });
  } catch (err) {
    res.render("error", { error: err.message, routeName: "Customers" });
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const {
      session: { accountId },
      body,
    } = req;

    const randomAddress = faker.random.arrayElement(addresses);

    const customer = await stripe.customers.create(
      {
        name: body.name || faker.name.findName(),
        phone: body.phone || faker.phone.phoneNumberFormat(2),
        email: body.email || faker.internet.email(),
        address: {
          city: body.city || randomAddress.city,
          country: "US",
          line1: body.line1 || randomAddress.line1,
          line2: body.line2 || randomAddress.line2,
          postal_code: body.postal_code || randomAddress.postal_code,
          state: body.state || randomAddress.state,
        },
      },
      { stripeAccount: accountId }
    );

    if (req.accepts("html")) {
      return res.render("partials/customer", { layout: false, ...customer });
    }

    res.json(customer);
  } catch (err) {
    next(err);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const {
      session: { accountId },
      params: { customerId },
    } = req;

    const result = await stripe.customers.del(customerId, {
      stripeAccount: accountId,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getCustomerEdit = async (req, res) => {
  try {
    const {
      session: { accountId },
      params: { customerId },
    } = req;

    const customer = await stripe.customers.retrieve(customerId, {
      stripeAccount: accountId,
    });

    res.render("customers_edit", { customer: customer });
  } catch (err) {
    res.render("error", { error: err.message, routeName: "Customers" });
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const {
      session: { accountId },
      params: { customerId },
      body,
    } = req;

    const customer = await stripe.customers.update(
      customerId,
      {
        name: body.name,
        phone: body.phone,
        email: body.email,
        address: {
          city: body.city,
          country: body.country,
          line1: body.line1,
          line2: body.line2,
          postal_code: body.postal_code,
          state: body.state,
        },
        description: body.description,
      },
      { stripeAccount: accountId }
    );

    res.json(customer);
  } catch (err) {
    next(err);
  }
};

const getCustomerInvoices = async (req, res) => {
  try {
    const {
      session: { accountId },
      params: { customerId },
    } = req;

    const [customer, prices] = await Promise.all([
      stripe.customers.retrieve(customerId, { stripeAccount: accountId }),
      stripe.prices.list(
        { active: true, limit: 100 },
        { stripeAccount: accountId }
      ),
    ]);

    res.render("new_invoice", { prices: prices.data, customer });
  } catch (err) {
    res.render("error", { error: err.message, routeName: "Customers" });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  getCustomerEdit,
  getCustomerInvoices,
  createCustomer,
  deleteCustomer,
  updateCustomer,
};
