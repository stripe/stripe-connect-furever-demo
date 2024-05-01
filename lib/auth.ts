import type {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import Studio, {IStudio} from '../app/models/studio';
import {stripe} from '@/lib/stripe';

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

      console.log('looking for studio for email', session.user?.email);
      const studio: IStudio = await Studio.findOne({
        email: session.user?.email,
      });
      if (!studio) {
        console.error('Could not find a user for email in login');
        throw new Error('Could not find a user for email in login');
      }

      let stripeAccount;
      if (studio.stripeAccountId) {
        try {
          stripeAccount = await stripe.accounts.retrieve(
            studio.stripeAccountId
          );
        } catch (err) {
          console.error('Could not retrieve stripe account for user', err);
          throw err;
        }
        session.user.stripeAccount = stripeAccount;
      }

      console.log(`Got session for user ${studio.email}`);

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
          id: user._id,
          email: user.email,
        };
      },
    }),
    CredentialsProvider({
      id: 'loginas',
      name: 'Account ID',
      credentials: {
        accountId: {},
      },
      async authorize(credentials, req) {
        await dbConnect();

        let user: IStudio | null = null;
        try {
          const stripeAccountId = credentials?.accountId;
          // Login as sets the password if it doesn't exist
          const password = 'go bears';

          if (!stripeAccountId) {
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
                firstName: stripeAccount.individual?.first_name,
                lastName: stripeAccount.individual?.last_name,
                stripeAccountId: stripeAccountId,
              });
              console.log('Creating Studio...');
              await user!.save();
              console.log('Studio was created');
            } else {
              console.log(
                'Could not find a user for account id',
                stripeAccountId
              );
              return null;
            }
          }
        } catch (err) {
          console.warn('Got an error authorizing a user during login', err);
          return null;
        }

        return {
          id: user!._id,
          email: user!.email,
        };
      },
    }),
    CredentialsProvider({
      id: 'createaccount',
      name: 'Create a Stripe account',
      credentials: {
        email: {},
        businessType: {},
        businessName: {},
        country: {},
        stripeDashboardType: {},
        paymentLosses: {},
        feePayer: {},
      },
      async authorize(credentials, req) {
        await dbConnect();
        console.log('Signing up');

        const email = credentials?.email;
        if (!email) {
          console.log('Could not find an email to create a Stripe account for');
          return null;
        }

        let user: IStudio | null = null;
        try {
          // Look for existing user.
          user = await Studio.findOne({email});
          if (!user) {
            console.log('Could not find an existing user for the email', email);
            return null;
          }

          console.log('Creating stripe account for the email', email);

          const account = await stripe.accounts.create({
            controller: {
              fees: {payer: credentials.feePayer},
              losses: {payments: credentials.paymentLosses},
              stripe_dashboard: {type: credentials.stripeDashboardType},
              requirement_collection:
                credentials.paymentLosses === 'application' &&
                credentials.stripeDashboardType === 'none'
                  ? 'application'
                  : 'stripe',
            },
            country: 'US',
            email: email,
          });

          user.stripeAccountId = account.id;
          console.log('Updating Studio...');
          await user!.save();
          console.log('Studio was updated');
        } catch (error: any) {
          console.log('Got an error creating a Stripe account', error);
          return null;
        }

        return {
          id: user!._id,
          email: user!.email,
          stripeAccountId: user!.stripeAccountId,
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

          user = new Studio({
            email,
            password,
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
          id: user!._id,
          email: user!.email,
        };
      },
    }),
  ],
};
