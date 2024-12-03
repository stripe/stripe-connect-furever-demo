import {type NextRequest} from 'next/server';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const json = await req.json();

    const {demoOnboarding, locale} = json;

    let stripeAccountId = session?.user?.stripeAccount?.id;

    let demoAccount = undefined;
    if (demoOnboarding !== undefined) {
      const accountId: string = (() => {
        switch (locale) {
          case 'fr-FR':
            return process.env.EXAMPLE_DEMO_ONBOARDING_ACCOUNT_FR!;
          case 'en-SG':
            // This doesn't actually have a locale. So this can never be hit
            return process.env.EXAMPLE_DEMO_ONBOARDING_ACCOUNT_SG!;
          case 'en-GB':
          // Use GB english for Hong Kong so fall through
          case 'zh-Hant-HK':
            return process.env.EXAMPLE_DEMO_ONBOARDING_ACCOUNT_HK!;
          default:
            // Ignore
            return process.env.EXAMPLE_DEMO_ONBOARDING_ACCOUNT!;
        }
      })();

      console.log(
        `Looking for the demo onboarding account ${accountId} for locale ${locale}`
      );
      const demoOnboardingAccount = await stripe.v2.core.accounts.retrieve(
        accountId,
        {
          include: ['defaults', 'identity'],
        }
      );
      if (demoOnboardingAccount) {
        console.log(
          `Using demo onboarding account: ${demoOnboardingAccount.id}`
        );
        stripeAccountId = demoOnboardingAccount.id;
        demoAccount = demoOnboardingAccount;
      } else {
        console.log('No demo onboarding account found');
      }
    }

    if (!stripeAccountId) {
      return new Response(
        JSON.stringify({
          error: 'No Stripe account found for this user',
        }),
        {status: 400}
      );
    }

    const account =
      demoAccount ??
      (await stripe.v2.core.accounts.retrieve(stripeAccountId, {
        include: ['defaults', 'identity'],
      }));

    const isCustom =
      account?.dashboard === 'none' &&
      account?.defaults?.responsibilities?.losses_collector === 'application' &&
      account?.defaults.responsibilities.fees_collector === 'application';

    const accountSession = await stripe.accountSessions.create({
      account: stripeAccountId,
      components: {
        // Payments
        payments: {
          enabled: true,
        },
        payouts: {
          enabled: true,
          features: {
            instant_payouts: true,
            standard_payouts: true,
            edit_payout_schedule: true,
            disable_stripe_user_authentication: isCustom,
          },
        },
        // Connect
        account_management: {
          enabled: true,
          features: {
            disable_stripe_user_authentication: isCustom,
          },
        },
        account_onboarding: {
          enabled: true,
          features: {
            disable_stripe_user_authentication: isCustom,
          },
        },
        documents: {enabled: true},
        notification_banner: {
          enabled: true,
          features: {
            disable_stripe_user_authentication: isCustom,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        client_secret: accountSession.client_secret,
      }),
      {status: 200, headers: {'Content-Type': 'application/json'}}
    );
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create an account session',
      error
    );
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  }
}
