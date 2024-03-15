const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { getCurrencySymbol } = require("./utils/currency");

const getHomePage = (req, res) => {
  res.render("index");
};

const getNotFound = (req, res) => {
  res.render("404");
};

const getDashboardPage = async (req, res) => {
  try {
    const {
      session: { accountId },
    } = req;
    const [account, customers, services] = await Promise.all([
      stripe.accounts.retrieve(accountId),
      stripe.customers.list({ limit: 100 }, { stripeAccount: accountId }),
      stripe.products.list(
        { limit: 100, active: true },
        { stripeAccount: accountId }
      ),
    ]);

    req.session.isOnboarded = account.details_submitted;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const dayOfWeek = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    res.render("home", {
      currencySymbol: getCurrencySymbol(req.session.country),
      displayName: req.session.userName,
      customers: {
        count: customers.data.length,
      },
      services: {
        count: services.data.length,
      },
      formattedDate,
      dayOfWeek,
    });
  } catch (err) {
    console.log(err);
    res.render("error", { error: err.message, routeName: "Home" });
  }
};

module.exports = {
  getHomePage,
  getNotFound,
  getDashboardPage,
};
