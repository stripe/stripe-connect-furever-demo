# TODO: This needs to be updated to match the designs / wire frames / branding of Pose, once available. 

Pose: Stripe Connect platform demo

Pose -  is a vertical SaaS platform that provides software for the health and wellness industry, especially targeting small, independently owned gyms. Pose’s product allows yoga studios to get up and running quickly so they can focus on what they do best: helping their customers to live a healthy, balanced life. 


Potential service providers companies can create platform account for their own business and can manage a list of their services and employees and accept payments for services provided. 

Pose wants to provide access to Stripe products and UIs directly in their website, at a fraction of the engineering cost, using [Stripe Connect](https://stripe.com/connect) and [Stripe Connect embedded components](https://stripe.com/docs/connect/get-started-connect-embedded-components). 

To Be Added
**See a live version on [Pose]().**


<img src="public/images/homebox_landing.png" width="440">

<img src="public/images/homebox_dashboard.png" width="440">

## Features
Homebox showcases the integration between a platform's website, [Stripe Connect](https://stripe.com/connect), and [Stripe Connect embedded components](https://stripe.com/docs/connect/get-started-connect-embedded-components). Users sign up within the platform's website and through the process, a corresponding Stripe unified account is created with the following configuration:
- Stripe owns loss liability
- Platform owns pricing
- Stripe is onboarding owner
- The connected account has no access to the Stripe dashboard

The user will then onboard with Stripe via embedded onboarding. Thereafter, Connect embedded components will provide the UI surfaces for account management and dashboard UI elements with just a few lines of code. The demo website also uses the Stripe API to create test payments and payouts. This app also contains a basic authentication system.

Homebox makes use of the following Connect embedded components:
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

To integrate Stripe Connect embedded components, check out our [documentation](https://stripe.com/docs/connect/get-started-connect-embedded-components).
1. [`server/public/javascripts/connect.js`](server/public/javascripts/connect.js) shows the client side integration with Connect embedded components.
    - [`server/views/layout.pug`](server/views/layout.pug) shows how to include the connect.js script in your application.
    - [`server/views/dashboard.pug`](server/views/dashboard.pug) has an example of rendering a Connect embedded component.
2. [`server/routes/stripe.js`](server/routes/stripe.js) shows the server request to `v1/account_sessions`.

## Running locally

If you want to run this demo locally against a different Stripe account, follow the instructions below:

### Requirements

- You'll need a Stripe account. [Sign up for free](https://dashboard.stripe.com/register) before running the application.
- Node.js >= 14.7.0

### Getting Started

Clone the repo and install dependencies using npm (or yarn):

```
$ git clone ...
$ cd homebox
$ npm install
```

If this is your first time running the app, you'll need to setup Stripe Connect and branding on your Stripe account:

1. Make sure Stripe Connect is enabled in the [dashboard](https://dashboard.stripe.com/test/connect/accounts/overview)
2. Set up Standard Accounts and make sure **Payouts** are enabled in [standard setup](https://dashboard.stripe.com/test/settings/connect/platform_controls)
3. Set up Homebox Brading in [settings](https://dashboard.stripe.com/settings/connect):
   - Use `Homebox` as the **business name**
   - Upload [Homebox logo](./public/images/favicon.ico) to the **Icon**
   - Set `#C45153` to the **Brand colour**
   - Set `#DC5B5E` to the **Accent colour**

Copy the example .env file. You'll need to define the following env variables:

- Your [Stripe API keys](https://dashboard.stripe.com/account/apikeys) to `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`
- A random string to keep user authentication secure to `SESSION_SECRET_KEY`

```
$ cp .env.example .env
```

Then install dependencies

```
$ npm install
```

Run the app:

```
$ npm run dev
```

Go to [http://localhost:3003](http://localhost:3003) in your browser to start using Homebox.