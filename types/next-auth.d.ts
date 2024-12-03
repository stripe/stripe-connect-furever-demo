import NextAuth, {DefaultSession} from 'next-auth';
import Stripe from '@stripe/stripe';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's Stripe account. 
       *  We are intentionally not using the `Stripe.V2.Core.Account` type here so we can limit
       *  the amount of data we need to fetch each time we get the session. Eventually we want
       *  all components and pages to retrieve the user's Stripe account on their own and only store
       *  the `id` in the session.
      */
      stripeAccount: Pick<
        Stripe.V2.Core.Account,
        'id' | 'identity' | 'defaults'
      >;
      businessName?: string | null;
      password?: string | null;
      setup?: boolean;
      changedPassword: boolean;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      setup?: boolean | null;
    };
  }
}
