import NextAuth, {DefaultSession} from 'next-auth';
import Stripe from 'stripe';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's Stripe account. */
      stripeAccount: Stripe.Account;
      businessName?: string | null;
    } & DefaultSession['user'];
  }
}
