const express = require("express");
const router = express.Router();

const noAuth = require("../middlewares/noAuth");
const auth = require("../middlewares/auth");

const { getHomePage, getDashboardPage, getNotFound } = require("./main");

const {
  createAccountSession,
  createInterventions,
  createPayments,
  createPayouts,
  getAccountPage,
  getPaymentsPage,
  getPayoutsPage,
} = require("./embedded");

const {
  getCustomers,
  getCustomerById,
  getCustomerEdit,
  getCustomerInvoices,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} = require("./customers");

const {
  getSignUpUserStep,
  createUser,
  getSignUpOnboardingPage,
  getSignInPage,
  loginUser,
  logoutUser,
} = require("./user");

const {
  getServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
} = require("./services");

const {
  createInvoice,
  setVoidStatusToInvoice,
  updateInvoice,
} = require("./invoices");

const { getInPersonPaymentPage, getConnectionToken } = require("./terminal");

// Main router
router.get("/", noAuth, getHomePage);
router.get("/home", auth, getDashboardPage);
router.post("/account_session", createAccountSession);

// Embedded router
router.get("/payments", auth, getPaymentsPage);
router.post("/payments", auth, createPayments);
router.get("/payouts", auth, getPayoutsPage);
router.post("/payouts", auth, createPayouts);
router.get("/account", auth, getAccountPage);
router.post("/interventions", auth, createInterventions);

// User router
router.get("/signup/user", noAuth, getSignUpUserStep);
router.get("/signup/onboarding", auth, getSignUpOnboardingPage);
router.get("/signin", noAuth, getSignInPage);
router.get("/signout", auth, logoutUser);
router.post("/signup/user", noAuth, createUser);
router.post("/signin", noAuth, loginUser);

// Invoices router
router.post("/invoices", auth, createInvoice);
router.post("/invoices/:invoiceId/void", auth, setVoidStatusToInvoice);
router.put("/invoices", auth, updateInvoice);

// Customers router
router.get("/customers", auth, getCustomers);
router.get("/customers/:customerId", auth, getCustomerById);
router.get("/customers/:customerId/invoice", auth, getCustomerInvoices);
router.get("/customers/:customerId/edit", auth, getCustomerEdit);
router.get("/customers/:customerId/pay", auth, getInPersonPaymentPage);
router.post("/customers", auth, createCustomer);
router.post("/customers/:customerId", auth, updateCustomer);
router.delete("/customers/:customerId", auth, deleteCustomer);

// Services router
router.get("/services", auth, getServices);
router.post("/services", auth, createService);
router.get("/services/:serviceId", auth, getServiceById);
router.post("/services/:serviceId", auth, updateService);
router.delete("/services/:serviceId", auth, deleteService);

// Terminal router
router.post("/connection_token", auth, getConnectionToken);

// 404
router.get("*", getNotFound);

module.exports = router;
