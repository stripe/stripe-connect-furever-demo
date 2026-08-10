import {type NextRequest, NextResponse} from 'next/server';
import {createMobileConnectAccountSession} from '@/lib/mobileConnectDemo';

export async function POST(request: NextRequest) {
  const account =
    request.headers.get('account') || process.env.DEFAULT_CONNECTED_ACCOUNT;

  if (!account) {
    return NextResponse.json(
      {error: 'An account header or DEFAULT_CONNECTED_ACCOUNT is required.'},
      {status: 400}
    );
  }

  if (!account.startsWith('acct_')) {
    return NextResponse.json(
      {error: 'The account must be a valid Stripe account ID.'},
      {status: 400}
    );
  }

  try {
    const accountSession = await createMobileConnectAccountSession(account);

    return NextResponse.json({client_secret: accountSession.client_secret});
  } catch (error) {
    console.error(
      'An error occurred when calling the Stripe API to create a mobile Connect account session',
      error
    );

    return NextResponse.json(
      {error: error instanceof Error ? error.message : 'Unknown error'},
      {status: 500}
    );
  }
}
