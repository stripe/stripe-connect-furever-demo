# FurEver: Stripe Connect embedded UIs demo

FurEver is a vertical SaaS grooming platform for pet salons to manage their e2e business operations. FurEver wants to provide access to Stripe products and UIs directly in their website, at a fraction of the engineering cost, using [Stripe Connect](https://stripe.com/connect) and [Stripe Connect embedded UIs](https://stripe.com/docs/connect/get-started-connect-embedded-uis). 

**See a live version on [furever.dev](https://furever.dev).**


<img src="server/public/images/screenshots/furever_landing.png" width="440">

<img src="server/public/images/screenshots/furever_dashboard.png" width="440">

## Features
FurEver showcases the integration between a platform's website, [Stripe Connect](https://stripe.com/connect), and [Stripe Connect embedded UIs](https://stripe.com/docs/connect/get-started-connect-embedded-uis). Users sign up within the platform's website and through the process, a corresponding UA7 account is created. The user will then onboard with Stripe via embedded onboarding. Thereafter, Connect embedded UIs will provide the UI surfaces for account management and dashboard UI elements with just a few lines of code. The demo website also uses the Stripe API to create test payments and payouts.

- Basic user authentication system.
- Connect embedded UIs:
    - `<stripe-connect-account-onboarding></stripe-connect-account-onboarding>` enables an embedded onboarding experience without redirecting users to Stripe hosted onboarding.
    - `<stripe-connect-payments></stripe-connect-payments>` provides a list to display Stripe payments, refunds, and disputes. This also includes handling list filtering, pagination, and CSV exports.
    - `<stripe-connect-payouts></stripe-connect-payouts>` provides a list to display Stripe payouts and balance. This also includes handling list filtering, pagination, and CSV exports.
    - `<stripe-connect-account-management></stripe-connect-account-management>` allows users to edit their Stripe account settings without navigating to the Stripe dashboard.
    - `<stripe-connect-notification-banner></stripe-connect-notification-banner>` displays a list of current and future risk requirements an account needs to resolve.

### Architecture
The web application is implemented as as full-stack application powered by Express.js, with a Pug template engine for the frontend, and a Node.js REST API.

To integrate Stripe Connect in your own app:
1. [`server/routes/stripe.js`](server/routes/stripe.js) shows how to interact with the Stripe API.
    - [`server/public/javascripts/createAccount.js`](server/public/javascripts/createAccount.js) is the client-side javascript for creating a Stripe connected account.
    - [`server/public/javascripts/onboarding.js`](server/public/javascripts/onboarding.js) is the client-side javascript for listening to the `onboardingComplete` event in the embedded onboarding UI component.
    - [`server/public/javascripts/createPayments.js`](server/public/javascripts/createPayments.js) is the client-side javascript for creating a test payment.
    - [`server/public/javascripts/createPayouts.js`](server/public/javascripts/createPayouts.js) is the client-side javascript for creating a test payout.
2. [`server/routes/main.js`](server/routes/main.js) shows the basic routing for the application.

To integrate Stripe Connect embedded UIs, check out our [documentation](https://stripe.com/docs/connect/get-started-connect-embedded-uis).
1. [`server/public/javascripts/connect.js`](server/public/javascripts/connect.js) shows the client side integration with Connect embedded UIs.
    - [`server/views/layout.pug`](server/views/layout.pug) shows how to include the connect.js script in your application.
    - [`server/views/dashboard.pug`](server/views/dashboard.pug) has an example of rendering a Connect embedded UI.
2. [`server/routes/stripe.js`](server/routes/stripe.js) shows the server request to `v1/account_sessions`.

## Requirements

You'll need a Stripe account to manage pet salon onboarding and payments:
- [Sign up for free](https://dashboard.stripe.com/register), then [enable Connect](https://dashboard.stripe.com/account/applications/settings) by filling in your Connect settings.
- Fill in the necessary information in the **Branding** section in [Connect settings](https://dashboard.stripe.com/test/settings/connect).

You'll need to have [Node.js](http://nodejs.org) >= 7.x and [MongoDB](https://www.mongodb.com/docs/manual/installation/) installed to run this app.

### Getting started

Install dependencies using npm (or yarn):

```
cd server
npm install
```

Copy the environment file and add your own [Stripe API keys](https://dashboard.stripe.com/account/apikeys):

```
cp .env.example .env
```

Make sure MongoDB is running. If you're using Homebrew on macOS:

```
brew services start mongodb-community@6.0
```
OR
```
brew services start mongodb
```

Run the app:

```
npm start
```

Go to http://localhost:3000 in your browser to start using the app.