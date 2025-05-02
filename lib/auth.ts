import type {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Stripe from 'stripe';
import dbConnect from '@/lib/dbConnect';
import {stripe} from '@/lib/stripe';
import {resolveControllerParams} from './utils';
import Salon from '../app/models/salon';

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

    async session({session, token}) {
      // If session is already populated then return it
      if (session?.user?.stripeAccount) {
        return session;
      }
      try {
        await dbConnect();
      } catch (err) {
        console.error('Could not connect to the db');
        throw err;
      }

      console.log(
        'looking for salon for email',
        session.user?.email,
        session.user?.stripeAccount
      );
      const salon = await Salon.findOne({
        email: session.user?.email,
      });
      if (!salon) {
        console.error('Could not find a user for email in getting the session');
        throw new Error(
          'Could not find a user for email in getting the session'
        );
      }
      console.log('Found salon', salon);

      let stripeAccount;
      if (salon.stripeAccountId) {
        try {
          stripeAccount = await stripe.accounts.retrieve(salon.stripeAccountId);
        } catch (err) {
          console.error('Could not retrieve stripe account for user', err);
          throw err;
        }
        session.user.stripeAccount = stripeAccount;
        session.user.businessName = salon.businessName;
        session.user.password = salon.password;
        session.user.setup = salon.setup;
        session.user.changedPassword = salon.changedPassword;
      }

      console.log(`Got session for user ${salon.email}`);

      return session;
    },
    async jwt({token, trigger, session}) {
      if (trigger === 'update' && session?.user) {
        console.log('Updating token with name');
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.email = session.user.email;
        token.setup = session.user.setup;
        token.changedPassword = session.user.changedPassword;
        console.log('finished updating token', token);
      }
      return token;
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

        let user = null;
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          if (!email) {
            console.log('Could not find an email for provider');
            return null;
          }

          user = await Salon.findOne({email});
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
      id: 'createprefilledaccount',
      name: 'Create a prefilled Stripe account and Furever account',
      credentials: {
        email: {},
        password: {},
        businessName: {},
      },
      async authorize(credentials, req) {
        await dbConnect();

        const bankAccountToken = (
          await stripe.tokens.create({
            bank_account: {
              country: 'US',
              currency: 'usd',
              account_holder_name: 'Jenny Rosen',
              account_holder_type: 'individual',
              routing_number: '110000000',
              account_number: '000123456789',
            },
          })
        ).id;
        console.log('Creating bank account token');

        const email = credentials?.email;
        const password = credentials?.password;
        if (!email) {
          console.log('Could not find an email to create an account for');
          return null;
        }

        console.log('Signing up');
        let user = null;
        try {
          // Look for existing user.
          user = await Salon.findOne({email});
          if (user) {
            console.log('Found an existing user, cannot sign up again');
            return null;
          }

          user = new Salon({
            email,
            password,
            quickstartAccount: true,
            setup: false,
            changedPassword: false,
          });
          console.log('Creating Salon...');
          await user!.save();
          console.log('Salon was created');
        } catch (error: any) {
          console.log(
            'Got an error authorizing and creating a user during signup',
            error
          );
          return null;
        }

        try {
          if (!user) {
            console.log('Could not find an existing user for the email', email);
            return null;
          }
          console.log('Creating stripe account for the email', email);
          const account = await stripe.accounts.create({
            country: 'US',
            email: email,
            external_account: bankAccountToken,
            controller: resolveControllerParams({
              feePayer: 'application',
              paymentLosses: 'application',
              stripeDashboardType: 'none',
            }),
            business_type: 'individual',
            business_profile: {
              mcc: '7299',
              name: credentials?.businessName || 'Furever',
              product_description: 'Description',
              support_address: {
                line1: 'address_full_match',
                city: 'South San Francisco',
                state: 'CA',
                postal_code: '94080',
              },
              support_email: 'furever@stripe.com',
              support_phone: '0000000000',
              support_url: 'https://furever.dev',
              url: 'https://furever.dev',
            },
            individual: {
              first_name: 'Jenny',
              last_name: 'Rosen',
              id_number: '222222222',
              email: email,
              address: {
                line1: 'address_full_match',
                city: 'South San Francisco',
                state: 'CA',
                postal_code: '94080',
              },
              dob: {
                day: 1,
                month: 1,
                year: 1902,
              },
              phone: '0000000000',
              ssn_last_4: '2222',
            },
            company: {
              tax_id: '222222222',
              name: 'Jenny Rosen',
            },
            settings: {
              card_payments: {
                statement_descriptor_prefix: 'FurEver',
                statement_descriptor_prefix_kana: null,
                statement_descriptor_prefix_kanji: null,
              },
              payments: {
                statement_descriptor: 'FurEver',
                statement_descriptor_kana: undefined,
                statement_descriptor_kanji: undefined,
              },
            },
            tos_acceptance: {
              date: Math.floor(Date.now() / 1000),
              ip: '50.123.109.237',
              service_agreement: 'full',
              user_agent:
                'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
            },
            capabilities: {
              card_payments: {
                requested: true,
              },
              transfers: {
                requested: true,
              },
            },
          });
          console.log(
            'Created stripe account',
            account.id,
            account.requirements?.disabled_reason
          );

          user.stripeAccountId = account.id;
          user.businessName = credentials?.businessName;
          console.log('Updating Salon...');
          await user!.save();

          console.log(
            'Salon was updated and updated salon is',
            user,
            account.requirements?.disabled_reason
          );
        } catch (error: any) {
          console.log('Got an error creating a Stripe account', error);
          return null;
        }

        return {
          id: user!._id,
          email: user!.email,
          stripeAccountId: user!.stripeAccountId,
          businessName: user!.businessName,
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

        let user = null;
        try {
          // Look for existing user.
          user = await Salon.findOne({email});
          if (!user) {
            console.log('Could not find an existing user for the email', email);
            return null;
          }
          let businessType;
          switch (credentials?.businessType) {
            case 'company':
            case 'individual':
              businessType =
                credentials?.businessType as Stripe.AccountCreateParams.BusinessType;
            default:
              businessType = undefined; // We default to undefined so user can pick the business type during onboarding
          }

          console.log('Creating stripe account for the email', email);
          const account = await stripe.accounts.create({
            country: credentials?.country || 'US',
            business_type: businessType,
            business_profile: {
              name: credentials?.businessName || 'Furever Pet Salon',
            },
            email: email,
            controller: resolveControllerParams({
              feePayer: credentials.feePayer,
              paymentLosses: credentials.paymentLosses,
              stripeDashboardType: credentials.stripeDashboardType,
            }),
            ...(credentials.stripeDashboardType === 'full'
              ? {}
              : {
                  capabilities: {
                    card_payments: {
                      requested: true,
                    },
                    transfers: {
                      requested: true,
                    },
                  },
                }),
          });
          console.log('Created stripe account', account.id);

          user.stripeAccountId = account.id;
          console.log('Updating Salon...');
          await user!.save();
          console.log('Salon was updated');
        } catch (error: any) {
          console.log('Got an error creating a Stripe account', error);
          return null;
        }

        return {
          id: user!._id,
          email: user!.email,
          stripeAccountId: user!.stripeAccountId,
          businessName: user!.businessName,
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

        let user = null;
        try {
          // Look for existing user.
          user = await Salon.findOne({email});
          if (user) {
            console.log('Found an existing user, cannot sign up again');
            return null;
          }

          user = new Salon({
            email,
            password,
            setup: true,
            changedPassword: true,
          });
          console.log('Creating Salon...');
          await user!.save();
          console.log('Salon was created');
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
