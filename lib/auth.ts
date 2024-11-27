import type {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import Salon from '../app/models/salon';
import {stripe} from '@/lib/stripe';
import {
  resolveCountryParam,
  resolveResponsibilitiesParams,
  resolveStripeDashboardTypeParam,
} from './utils';
import Stripe from '@stripe/stripe';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
          stripeAccount = await stripe.v2.core.accounts.retrieve(
            salon.stripeAccountId,
            {
              include: [
                'configuration.customer',
                'configuration.merchant',
                'configuration.recipient',
                'defaults',
                'identity',
                'requirements',
              ],
            }
          );
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
      id: 'loginas',
      name: 'Account ID',
      credentials: {
        accountId: {},
      },
      async authorize(credentials, req) {
        await dbConnect();

        let user = null;
        try {
          const stripeAccountId = credentials?.accountId;
          // Login as sets the password if it doesn't exist
          const password = 'go bears';

          if (!stripeAccountId) {
            console.log('Could not find an account id for provider');
            return null;
          }

          user = await Salon.findOne({stripeAccountId: stripeAccountId});
          if (!user) {
            // See if they exist on the platform
            const stripeAccount = await stripe.v2.core.accounts.retrieve(
              stripeAccountId,
              {
                include: [
                  'configuration.customer',
                  'configuration.merchant',
                  'configuration.recipient',
                  'defaults',
                  'identity',
                  'requirements',
                ],
              }
            );
            if (stripeAccount?.contact_email) {
              // Create the account locally
              user = new Salon({
                email: stripeAccount.contact_email,
                password,
                firstName: stripeAccount?.identity?.individual?.given_name,
                lastName: stripeAccount.identity?.individual?.surname,
                stripeAccountId: stripeAccountId,
              });
              console.log('Creating Salon...');
              await user!.save();
              console.log('Salon was created');
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

          const account = await stripe.v2.core.accounts.create({
            contact_email: email,
            configuration: {
              merchant: {
                mcc: '7299',
                statement_descriptor: {
                  descriptor: 'FurEver',
                  prefix: 'FurEver',
                },
                support: {
                  address: {
                    line1: '354 Oyster Point Blvd',
                    city: 'South San Francisco',
                    state: 'ca',
                    postal_code: '94080',
                    country: 'us',
                  },
                  email: 'furever@stripe.com',
                  phone: '8581234567',
                  url: 'https://furever.dev',
                },
                features: {
                  card_payments: {
                    requested: true,
                  },
                },
              },
              recipient: {
                features: {
                  stripe_balance: {
                    stripe_transfers: {
                      requested: true,
                    },
                  },
                },
              },
              customer: {},
            },
            identity: {
              country: 'us',
              entity_type: 'individual',
              business_details: {
                registered_name: credentials?.businessName || 'Furever',
                product_description: 'Description',
                url: 'https://furever.dev',
              },
              individual: {
                given_name: 'Jenny',
                surname: 'Rosen',
                id_numbers: [
                  {
                    type: 'us_ssn_last_4',
                    value: '0000',
                  },
                  {
                    type: 'us_ssn',
                    value: '000000000',
                  },
                ],
                email: email,
                address: {
                  line1: '354 Oyster Point Blvd',
                  city: 'South San Francisco',
                  state: 'CA',
                  postal_code: '94080',
                  country: 'us',
                },
                date_of_birth: {
                  day: 1,
                  month: 1,
                  year: 1902,
                },
                phone: '8581234567',
              },
              attestations: {
                terms_of_service: {
                  account: {
                    date: new Date().toISOString(),
                    ip: '50.123.109.237',
                    user_agent:
                      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
                  },
                },
              },
            },
            defaults: {
              responsibilities: resolveResponsibilitiesParams({
                feesCollector: 'application',
                paymentLosses: 'application',
              }),
            },
            dashboard: resolveStripeDashboardTypeParam('none'),
          });
          await stripe.accounts.createExternalAccount(account.id, {
            external_account: bankAccountToken,
          });
          console.log('Created stripe account', account.id);

          user.stripeAccountId = account.id;
          user.businessName = credentials?.businessName;
          console.log('Updating Salon...');
          await user!.save();

          console.log('Salon was updated and updated salon is', user);
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
        feesCollector: {},
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
                credentials?.businessType as Stripe.V2.Core.AccountCreateParams.Identity.EntityType;
            default:
              businessType = undefined; // We default to undefined so user can pick the business type during onboarding
          }

          console.log('Creating stripe account for the email', email);
          const account = await stripe.v2.core.accounts.create({
            contact_email: email,
            identity: {
              country: resolveCountryParam(credentials?.country) || 'us',
              entity_type: businessType,
              business_details: {
                registered_name: credentials?.businessName || 'Furever',
              },
            },
            defaults: {
              responsibilities: resolveResponsibilitiesParams({
                feesCollector: credentials.feesCollector,
                paymentLosses: credentials.paymentLosses,
              }),
            },
            dashboard: resolveStripeDashboardTypeParam(
              credentials.stripeDashboardType
            ),
            ...(credentials.stripeDashboardType === 'full'
              ? {}
              : {
                  configuration: {
                    merchant: {
                      features: {
                        card_payments: {
                          requested: true,
                        },
                      },
                    },
                    recipient: {
                      features: {
                        stripe_balance: {
                          stripe_transfers: {
                            requested: true,
                          },
                        },
                      },
                    },
                    customer: {},
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
