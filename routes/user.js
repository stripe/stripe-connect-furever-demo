const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

var { createAccount } = require("./create_account.js");

const getSignUpUserStep = async (req, res) => {
  try {
    res.render("signup_user");
  } catch (err) {
    res.render("error", { error: err.message });
  }
};

const createUser = async (req, res, next) => {
  let customer, account;
  try {
    const {
      body: { name, email },
    } = req;

    const { data: customers } = await stripe.customers.list({ email });
    if (customers.length) {
      throw new Error("Account already exists. Please Sign In!");
    }

    const accountResult = await createAccount(req);
    if (accountResult.error) {
      throw new Error(
        `There was an error creating an account: ${accountResult.error}`
      );
    }
    account = accountResult.account;

    customer = await stripe.customers.create({
      name,
      email,
      metadata: {
        accountId: account.id,
      },
    });

    req.session.accountId = account.id;
    req.session.country = account.country;
    req.session.userName = customer.name;
    req.session.userEmail = customer.email;
    req.session.isAuthenticated = true;

    res.json({ customer, account });
  } catch (err) {
    if (customer) {
      stripe.customers.del(customer.id).catch(() => {});
    }
    if (account) {
      stripe.accounts.del(account.id).catch(() => {});
    }

    next(err);
  }
};

const getSignUpOnboardingPage = async (req, res) => {
  try {
    const {
      session: { accountId },
      headers: { secure, host },
    } = req;

    if (!accountId) {
      res.redirect("signup/user");
    }

    res.render("signup_onboarding");
  } catch (err) {
    res.render("error", { error: err.message });
  }
};

const getSignInPage = (req, res) => {
  res.render("signin");
};

const loginUser = async (req, res, next) => {
  try {
    const {
      body: { email },
    } = req;

    if (!email) {
      throw new Error("Email shouldn't be empty!");
    }

    const { data: customers } = await stripe.customers.list({ email });

    if (!customers.length) {
      throw new Error("Account does not exist. Please Sign Up!");
    }

    const customer = customers[0];
    const account = await stripe.accounts.retrieve(customer.metadata.accountId);
    if (!account) {
      throw new Error("Account does not exist. Please Sign Up!");
    }

    console.log("account", account);
    req.session.accountId = account.id;
    req.session.country = account.country;
    req.session.userName = customer.name;
    req.session.userEmail = account.email;
    req.session.isAuthenticated = true;

    return res.json(customer);
  } catch (err) {
    next(err);
  }
};

const logoutUser = (req, res) => {
  req.session = null;
  res.redirect("/");
};

module.exports = {
  getSignUpUserStep,
  createUser,
  getSignUpOnboardingPage,
  getSignInPage,
  loginUser,
  logoutUser,
};
