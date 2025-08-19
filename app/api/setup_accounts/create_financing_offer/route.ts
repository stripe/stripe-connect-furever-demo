import {NextRequest} from 'next/server';
import {createFinancingOffer, validateSession} from '@/lib/capital';

export async function POST(req: NextRequest) {
  try {
    const sessionResult = await validateSession();

    if ('error' in sessionResult) {
      return new Response(sessionResult.error, {status: sessionResult.status});
    }

    const body = await req.json().catch(() => ({}));
    const offerState = body.offerState || 'delivered';

    const result = await createFinancingOffer({
      offerState,
      source: 'manual',
    });

    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: result.error,
          correlationId: result.correlationId,
        }),
        {
          status: 500,
          headers: {'Content-Type': 'application/json'},
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        correlationId: result.correlationId,
        offerState: result.offerState,
        accountId: result.accountId,
      }),
      {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }
    );
  } catch (error: any) {
    const correlationId = `manual_error_${Date.now()}`;

    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to create financing offer',
        correlationId,
      }),
      {
        status: 500,
        headers: {'Content-Type': 'application/json'},
      }
    );
  }
}
