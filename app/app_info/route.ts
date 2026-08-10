import {NextResponse} from 'next/server';
import {assertTestMode} from '@/lib/mobileConnectDemo';

export const dynamic = 'force-dynamic';

const availableMerchants = [
  {display_name: 'Default (Custom)', merchant_id: 'acct_1N9FIXQ26HdRlxHg'},
  {
    display_name: 'Onboarding (Custom W)',
    merchant_id: 'acct_1SxE0tLRuQcyS3ni',
  },
  {
    display_name: 'Onboarding (Custom X)',
    merchant_id: 'acct_1SxE2gLI4wv1VRRP',
  },
  {
    display_name: 'Onboarding (Custom Y)',
    merchant_id: 'acct_1SxE3QPzl24uL4qM',
  },
  {
    display_name: 'Onboarding (Custom Z)',
    merchant_id: 'acct_1SxE3yQ13bBuNBv2',
  },
  {display_name: 'Onboarding (UA7)', merchant_id: 'acct_1SxE4iLdTJoSTdxZ'},
  {
    display_name: 'Onboarding (Standard)',
    merchant_id: 'acct_1SxE5BPyfn1Wvsjr',
  },
  {
    display_name: 'Onboarding (Standard 2)',
    merchant_id: 'acct_1SxEHnLGCHvMfTBi',
  },
  {
    display_name: 'Onboarding (Express)',
    merchant_id: 'acct_1SxE5jLXrDlNQ5Hc',
  },
  {display_name: 'Onboarding (PNP)', merchant_id: 'acct_1SxE6XL44pZEVwR1'},
  {
    display_name: 'Onboarding (Germany)',
    merchant_id: 'acct_1SxEIiLgSKBc3GqT',
  },
  {
    display_name: 'Onboarding (Japan)',
    merchant_id: 'acct_1SwnnHQ11zy1CKJV',
  },
  {
    display_name: 'Onboarding (Canada)',
    merchant_id: 'acct_1SxEJoLgLddATk6N',
  },
  {
    display_name: 'Payments/Payouts (Express, US)',
    merchant_id: 'acct_1Sd26mLZ6KmkRAhV',
  },
  {
    display_name: 'Payments/Payouts (Custom, DE)',
    merchant_id: 'acct_1SnPRFLRXJX4cV3R',
  },
  {
    display_name: 'Payments/Payouts (Express, JP)',
    merchant_id: 'acct_1SnPTdLyKK8AwfKj',
  },
  {
    display_name: 'Payments/Payouts (Express w/USDC)',
    merchant_id: 'acct_1SnPYTLRfeFR501j',
  },
  {
    display_name: 'Payments/Payouts (UA7 account)',
    merchant_id: 'acct_1SnPe2L0DT036FLh',
  },
];

export async function GET() {
  try {
    assertTestMode();

    const publishableKey =
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ||
      process.env.STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey?.startsWith('pk_test_')) {
      throw new Error(
        'The mobile Connect demo endpoints require a test-mode Stripe publishable key.'
      );
    }

    return NextResponse.json({
      publishable_key: publishableKey,
      available_merchants: availableMerchants,
    });
  } catch (error) {
    console.error('Unable to load mobile Connect demo app info', error);

    return NextResponse.json(
      {error: error instanceof Error ? error.message : 'Unknown error'},
      {status: 500}
    );
  }
}
