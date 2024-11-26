import NextAuth, {DefaultSession} from 'next-auth';
import Stripe from '@stripe/stripe';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's Stripe account. */
      stripeAccount: Stripe.V2.Core.Account;
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
