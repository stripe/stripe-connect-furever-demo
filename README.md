# FurEver: Stripe Connect embedded components integration tutorial

FurEver is a vertical SaaS grooming platform for pet salons to manage their e2e business operations. FurEver wants to provide access to Stripe products and UIs directly in their website, at a fraction of the engineering cost, using [Stripe Connect](https://stripe.com/connect) and [Stripe Connect embedded components](https://docs.stripe.com/connect/get-started-connect-embedded-components).

**See a live version with embedded components on [furever.dev](https://furever.dev).**

<img src="public/cover.png">

## Features

FurEver showcases the integration between a platform's website, [Stripe Connect](https://stripe.com/connect), and [Stripe Connect embedded components](https://docs.stripe.com/connect/get-started-connect-embedded-components). Users sign up within the platform's website and through the process, a corresponding Stripe unified account is created with the following configuration:

- Stripe owns loss liability
- Platform owns pricing
- Stripe is onboarding owner
- The connected account has no access to the Stripe dashboard

The user will then onboard with Stripe via embedded onboarding. Thereafter, Connect embedded components will provide the UI surfaces for account management and dashboard UI elements with just a few lines of code. The demo website also uses the Stripe API to create test payments and payouts. This app also contains a basic authentication system.

### Architecture

The web application is implemented as as full-stack application using Express, React, Typescript, and Material UI.

This demo is built with

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

To integrate Stripe Connect embedded components, check out our [documentation](https://docs.stripe.com/connect/get-started-connect-embedded-components).

1. [`hooks/useConnect.ts`](client/hooks/Connect.tsx) shows the client side integration with Connect embedded components.
2. [`api/account_session/route.ts`](server/routes/stripe.ts) shows the server request to `v1/account_sessions`.


## Getting started

(Optional) Install Node and Yarn if you need to:

```
brew install nodenv
nodenv install 18.20.2
brew install yarn
```

Install dependencies using yarn (or npm):

```
yarn
```

(Optional) Create a new Stripe account to manage pet salon onboarding and payments:

- [Sign up for free](https://dashboard.stripe.com/register)
- [Enable Connect](https://dashboard.stripe.com/account/applications/settings) by filling in your Connect settings.


Copy the environment file and add your own [Stripe API keys](https://dashboard.stripe.com/account/apikeys):

```
cp .env.example .env
```

Install MongoDB Community Edition. Refer to the [official documentation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/). Then, run MongoDB:

```
brew tap mongodb/brew && brew update
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

Run the app:

```
yarn dev
```

Go to `http://localhost:{process.env.PORT}` in your browser to start using the app.

## Add Connect embedded components
### Connect embedded components session  

- Create an account session in app/api/account_session/route.ts

```js 
// Create an account session with embedded components
const accountSession = await stripe.accountSessions.create({
    account: stripeAccountId,
    components: {
    account_onboarding: {
        enabled: true,
        features: {
            // Disable the authenticate user step
            disable_stripe_user_authentication: true,
        },
    },
    payments: {
        enabled: true,
        features: {
            // Enable dispute and refund management
            dispute_management: true,
            refund_management: true,
        },
    },
    payouts: {
        enabled: true,
        features: {
            // Disable the authenticate user step
            disable_stripe_user_authentication: true,
        },
    },
    },
});
return new Response(JSON.stringify(accountSession), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
});
```

### Connect Onboarding component
- Load StripeConnectInstance in app/(auth)/onboarding/page.tsx
```js
// Fetch StripeConnectInstance to create embedded components
return loadConnectAndInitialize({
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
    fetchClientSecret: fetchClientSecret,
    appearance: {
        overlays: 'dialog',
        variables: {
            colorPrimary: '#625afa',
        },
    },
});
```

- Add Connect Account Onboarding component in app/(auth)/onboarding/page.tsx
```js
return (
<ConnectComponentsProvider connectInstance={stripeConnectInstance}>
    <ConnectAccountOnboarding
    onExit={() => {
        window.location.href = '/home?shownux=true';
    }}
    />
</ConnectComponentsProvider>
);
```

- Onboard new salon

### Connect Payments component
- Create test payments in the application

- Load StripeConnectInstance in app/(dashboard)/payments/page.tsx
```js
// Fetch StripeConnectInstance to create embedded components
const [stripeConnectInstance] = React.useState(() => {
    const fetchClientSecret = async () => {
      // Fetch the AccountSession client secret
      const response = await fetch('/api/account_session', {method: 'POST'});
      if (!response.ok) {
        // Handle errors on the client side here
        const {error} = await response.json();
        console.log('An error occurred: ', error);
        return undefined;
      } else {
        const {client_secret: clientSecret} = await response.json();
        return clientSecret;
      }
    };
    return loadConnectAndInitialize({
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
      fetchClientSecret: fetchClientSecret,
      appearance: {
        overlays: 'dialog',
        variables: {
          colorPrimary: '#625afa',
        },
      },
    });
});
```

- Add Connect Payments component in app/(dashboard)/payments/page.tsx
```js
<ConnectComponentsProvider connectInstance={stripeConnectInstance}>
    <ConnectPayments />
</ConnectComponentsProvider>
```

- Test Payments component with successful, declined and disputed payments

### Connect Payouts component
- Create test payout in the application
- Load StripeConnectInstance in app/(dashboard)/payouts/page.tsx
```js
// Fetch StripeConnectInstance to create embedded components
const [stripeConnectInstance] = React.useState(() => {
    const fetchClientSecret = async () => {
      // Fetch the AccountSession client secret
      const response = await fetch('/api/account_session', {method: 'POST'});
      if (!response.ok) {
        // Handle errors on the client side here
        const {error} = await response.json();
        console.log('An error occurred: ', error);
        return undefined;
      } else {
        const {client_secret: clientSecret} = await response.json();
        return clientSecret;
      }
    };
    return loadConnectAndInitialize({
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
      fetchClientSecret: fetchClientSecret,
      appearance: {
        overlays: 'dialog',
        variables: {
          colorPrimary: '#625afa',
        },
      },
    });
});
```

- Add Connect Payouts component in app/(dashboard)/payouts/page.tsx
```js
<ConnectComponentsProvider connectInstance={stripeConnectInstance}>
    <ConnectPayouts />
</ConnectComponentsProvider>
```
- Test Payouts component in the application