import type {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import Studio from '../app/models/studio';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16; embedded_connect_beta=v2;unified_accounts_beta=v1',
});

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },
  callbacks: {
    // @ts-ignore
    async session({session, user}) {
      await dbConnect();
      const studio = await Studio.findOne({email: session.user?.email});

      if (!studio) {
        return null;
      }

      const stripeAccount = await stripe.accounts.retrieve(
        studio.stripeAccountId
      );

      // @ts-ignore
      session.user.stripeAccount = stripeAccount;

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

        let user;
        try {
          const email = credentials?.email;
          const password = credentials?.password;

          user = await Studio.findOne({email});

          if (!user) {
            return null;
          }

          if (!user.validatePassword(password)) {
            return null;
          }
        } catch (err) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
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

        const email = credentials?.email;
        const password = credentials?.password;

        let user;
        try {
          // Look for existing user.
          user = await Studio.findOne({email});
          if (user) return null;

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

          // const controller = {
          //   application: {
          //     loss_liable: false, // Stripe owns loss liability
          //     onboarding_owner: false, // Stripe is the onboarding owner
          //     pricing_controls: true, // The platform is the pricing owner
          //   },
          //   dashboard: {
          //     type: "none" as const, // The connected account will not have access to dashboard
          //   },
          // };

          const account = await stripe.accounts.create({
            type: 'custom',
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
            external_account: bankAccount.id,
            business_profile: {
              name: 'Pose',
              mcc: '7299',
              url: 'https://pose.dev',
              product_description: 'Yoga studio',
              support_address: {
                line1: '354 Oyster Point Blvd',
                city: 'South San Francisco',
                state: 'CA',
                postal_code: '94080',
              },
              support_email: email,
              support_phone: '8888675309',
              support_url: 'https://pose.dev',
              estimated_worker_count: 10,
              annual_revenue: {
                amount: 1000000,
                currency: 'usd',
                fiscal_year_end: '2023-12-31',
              },
            },
            business_type: 'company',
            company: {
              name: 'Pose',
              address: {
                line1: 'address_full_match',
                city: 'South San Francisco',
                country: 'US',
                state: 'CA',
                postal_code: '94080',
              },
              directors_provided: true,
              executives_provided: true,
              owners_provided: true,
              phone: '8888675309',
              tax_id: '000000000',
            },
          });

          user = new Studio({email, password, stripeAccountId: account.id});
          await user.save();

          await stripe.accounts.createPerson(account.id, {
            first_name: firstName,
            last_name: lastName,
            address: {
              line1: 'address_full_match',
              city: 'South San Francisco',
              country: 'US',
              state: 'CA',
              postal_code: '94080',
            },
            dob: {
              day: 1,
              month: 1,
              year: 1901,
            },
            email: email,
            phone: '8888675309',
            ssn_last_4: '0000',
            relationship: {
              director: false,
              executive: true,
              owner: true,
              percent_ownership: 50,
              representative: true,
              title: 'CEO',
            },
          });

          await stripe.treasury.financialAccounts.create(
            {
              supported_currencies: ['usd'],
              features: {
                card_issuing: {requested: true},
                deposit_insurance: {requested: true},
                financial_addresses: {aba: {requested: true}},
                inbound_transfers: {ach: {requested: true}},
                intra_stripe_flows: {requested: true},
                outbound_payments: {
                  ach: {requested: true},
                  us_domestic_wire: {requested: true},
                },
                outbound_transfers: {
                  ach: {requested: true},
                  us_domestic_wire: {requested: true},
                },
              },
            },
            {stripeAccount: account.id}
          );
        } catch (error: any) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
};
