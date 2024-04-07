import type {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import Studio, {IStudio} from '../app/models/studio';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16; embedded_connect_beta=v2;unified_accounts_beta=v1',
});

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    async signIn({user}) {
      // Ensure the user exists on Stripe
      console.log('Signing in user', user);

      return true;
    },

    async session({session}) {
      try {
        await dbConnect();
      } catch (err) {
        console.error('Could not connect to the db');
        throw err;
      }

      const studio: IStudio = await Studio.findOne({
        email: session.user?.email,
      });
      if (!studio) {
        console.error('Could not find a user for email in login');
        throw new Error('Could not find a user for email in login');
      }

      let stripeAccount;
      try {
        stripeAccount = await stripe.accounts.retrieve(studio.stripeAccountId);
      } catch (err) {
        console.error('Could not retrieve stripe account for user', err);
        throw err;
      }

      session.user.stripeAccount = stripeAccount;
      console.log(
        `Got session for user ${studio.email} and stripe account ${stripeAccount.id}`
      );

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'Email & Password',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await dbConnect();

        let user: IStudio | null = null;
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          if (!email) {
            console.log('Could not find an email for provider');
            return null;
          }

          user = await Studio.findOne({email});
          if (!user) {
            return null;
          }

          if (!user.validatePassword(password)) {
            return null;
          }
        } catch (err) {
          console.warn('Got an error authorizing a user during login', err);
          return null;
        }

        return {
          id: user.stripeAccountId,
          email: user.email,
        };
      },
    }),
    CredentialsProvider({
      id: 'account',
      name: 'Account ID',
      credentials: {
        accountId: {},
        password: {},
      },
      async authorize(credentials, req) {
        await dbConnect();

        let user: IStudio | null = null;
        try {
          const stripeAccountId = credentials?.accountId;
          const password = credentials?.password;
          if (!stripeAccountId || !password) {
            console.log('Could not find an account id for provider');
            return null;
          }

          user = await Studio.findOne({stripeAccountId: stripeAccountId});
          if (!user) {
            // See if they exist on the platform
            const stripeAccount =
              await stripe.accounts.retrieve(stripeAccountId);
            if (stripeAccount?.email) {
              // Create the account locally
              user = new Studio({
                email: stripeAccount.email,
                password,
                firstName: stripeAccount.indivdual?.first_name,
                lastName: stripeAccount.individual?.last_name,
                stripeAccountId: stripeAccountId,
              });
              console.log('Creating Studio...');
              await user!.save();
              console.log('Studio was created');
            } else {
              return null;
            }
          } else {
            // Update the password
            user.password = password;
            await user!.save();
          }
        } catch (err) {
          console.warn('Got an error authorizing a user during login', err);
          return null;
        }

        return {
          id: user!.stripeAccountId,
          email: user!.email,
        };
      },
    }),
    CredentialsProvider({
      id: 'signup',
      name: 'Email & Password',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await dbConnect();
        console.log('Signing up');

        const email = credentials?.email;
        const password = credentials?.password;
        if (!email) {
          console.log('Could not find an email for authorization');
          return null;
        }

        let user: IStudio | null = null;
        try {
          // Look for existing user.
          user = await Studio.findOne({email});
          if (user) {
            console.log('Found an existing user, cannot sign up again');
            return null;
          }

          const firstName = 'Steve';
          const lastName = 'Kaliski';

          // Register the Stripe account
          const bankAccount = await stripe.tokens.create({
            bank_account: {
              country: 'US',
              currency: 'usd',
              account_holder_name: `${firstName} ${lastName}`,
              // account_holder_type: businessType,
              routing_number: '110000000',
              account_number: '000123456789',
            },
          });

          const controller = {
            losses: {payments: 'application'},
            fees: {payer: 'application'},
            requirement_collection: 'application',
            stripe_dashboard: {
              type: 'none' as const, // The connected account will not have access to dashboard
            },
          };

          console.log('Creating stripe account for the email', email);

          const account = await stripe.accounts.create({
            controller,
            capabilities: {
              card_payments: {
                requested: true,
              },
              transfers: {
                requested: true,
              },
              card_issuing: {
                requested: true,
              },
              treasury: {
                requested: true,
              },
            },
            country: 'US',
            email: email,
          });

          user = new Studio({
            email,
            password,
            firstName,
            lastName,
            stripeAccountId: account.id,
          });
          console.log('Creating Studio...');
          await user!.save();
          console.log('Studio was created');
        } catch (error: any) {
          console.log(
            'Got an error authorizing and creating a user during signup',
            error
          );
          return null;
        }

        return {
          id: user!.stripeAccountId,
          email: user!.email,
        };
      },
    }),
  ],
};
