const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  appInfo: {
    name: "stripe-demos/homebox-baas",
    version: "1.0.0",
    url: "https://stripe-demo-homebox-baas.onrender.com/"
  }
});

const faker = require('faker');

const { services } = require('../demo.config');

const getServices = async (req, res) => {
  try {
    const {
      session: { accountId },
    } = req;

    const [products, prices] = await Promise.all([
      stripe.products.list({ limit: 100, active: true }, { stripeAccount: accountId }),
      stripe.prices.list({ limit: 100, active: true }, { stripeAccount: accountId }),
    ]);

    const services = products.data.map((product) => ({
      ...product,
      price: prices.data.find((price) => price.product === product.id),
    }));

    res.render('services', { services: services });
  } catch (err) {
    res.render('error', { error: err.message, routeName: 'Services' });
  }
};

const createService = async (req, res, next) => {
  let product;

  try { 
    const {
      session: { accountId },
      body,
    } = req;

    const serviceType = faker.random.arrayElement(Object.keys(services)),
      serviceName = faker.random.arrayElement(services[serviceType]);

    product = await stripe.products.create(
      {
        name: body.name || serviceName,
        description: 'Lorem Ipsum is simply dummy text ...',
        metadata: {
          type: body.type || serviceType,
        },
      },
      { stripeAccount: accountId }
    );

    const price = await stripe.prices.create(
      {
        unit_amount: body.price || faker.commerce.price() * 100, // Converting price from dollars to cents
        currency: 'usd',
        product: product.id,
        nickname: product.name,
      },
      { stripeAccount: accountId }
    );

    const service = { ...product, price };

    if (req.accepts('html')) {
      return res.render('partials/service', { layout: false, ...service });
    }

    res.json(service);
  } catch (err) {
    if (product) {
      stripe.products.del(product.id).catch(() => {});
    }

    next(err);
  }
};

const getServiceById = async (req, res) => {
  try {
    const {
      session: { accountId },
      params: { serviceId },
    } = req;

    const [product, prices] = await Promise.all([
      stripe.products.retrieve(serviceId, { stripeAccount: accountId }),
      stripe.prices.list({ product: serviceId, active: true }, { stripeAccount: accountId }),
    ]);

    res.render('service_details', {
      service: { ...product, price: prices.data[0] },
    });
  } catch (err) {
    res.render('error', { error: err.message, routeName: 'Services' });
  }
};

const updateService = async (req, res, next) => {
  try {
    const {
      session: { accountId },
      params: { serviceId },
      body,
    } = req;

    const product = await stripe.products.update(
      serviceId,
      {
        name: body.name,
        description: body.description,
        metadata: { type: body.type },
      },
      { stripeAccount: accountId }
    );

    // There's can be only 1 active price for each product
    const {
      data: [oldPrice],
    } = await stripe.prices.list(
      {
        product: product.id,
        active: true,
      },
      { stripeAccount: accountId }
    );

    if (oldPrice) {
      await stripe.prices.update(oldPrice.id, { active: false }, { stripeAccount: accountId });
    }

    // Create new price for existing product
    const price = await stripe.prices.create(
      {
        unit_amount: body.amount * 100, // Converting price from dollars to cents
        currency: 'usd',
        product: product.id,
        nickname: product.name,
      },
      { stripeAccount: accountId }
    );

    const service = { ...product, price };

    res.json(service);
  } catch (err) {
    next(err);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const {
      session: { accountId },
      params: { serviceId },
    } = req;

    // There's can be only 1 active price for each product
    const {
      data: [oldPrice],
    } = await stripe.prices.list(
      { product: serviceId, active: true, limit: 100 },
      { stripeAccount: accountId }
    );
    let price;
    if (oldPrice) {
      price = await stripe.prices.update(
        oldPrice.id,
        {
          active: false,
        },
        { stripeAccount: accountId }
      );
    }

    const product = await stripe.products.update(
      serviceId,
      { active: false },
      { stripeAccount: accountId }
    );

    const service = { ...product, price };
    res.json(service);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
};
