import {NextRequest} from 'next/server';
import {createFinancingOffer, validateSession} from '@/lib/capital';

export async function POST(req: NextRequest) {
  try {
    const sessionResult = await validateSession();

    if ('error' in sessionResult) {
      return new Response(sessionResult.error, {
        status: sessionResult.status,
      });
    }

    const body = await req.json().catch(() => ({}));
    const offerState = body.offerState || 'delivered';

    const result = await createFinancingOffer({
      offerState,
      source: 'test_api',
    });

    if (!result.success) {
      return new Response(result.error, {status: 500});
    }

    return new Response(JSON.stringify({}), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    console.error(
      'An error occurred when calling the Stripe API to create test financing offer',
      error
    );
    return new Response(error.message, {status: 500});
  }
}
