# Sessions '24 Connect Demo

![preview](https://github.com/stripe-samples/s24-connect-demo/assets/59668283/69feff16-0cc9-4d56-a476-81d09ed15082)

## Overview

This demo is built with

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

Set up a platform with [the scenario](https://admin.corp.stripe.com/scenarios?id=scntmp*AY6-UTXCvgAAAL8d).

Install dependencies using npm (or yarn):

```
npm install
```

Copy the environment file and add your own [Stripe API keys](https://dashboard.stripe.com/account/apikeys):

```
cp .env.example .env.local
```

Install MongoDB Community Edition. Refer to the [official documentation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/). Then, run MongoDB:

```
brew tap mongodb/brew && brew update
brew install mongodb-community@7.0

```

Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
