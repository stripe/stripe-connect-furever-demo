import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';
import {NextRequest} from 'next/server';
import {redirect, RedirectType} from 'next/navigation';
import {Stripe} from 'stripe';

export async function GET(req: NextRequest) {
  let link = null;
  let shouldRedirect = false;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.stripeAccountId) {
      console.error('No connected account found for user');
      return new Response('No connected account found for user', {
        status: 400,
      });
    }

    const searchParams = new URLSearchParams(req.nextUrl.search);
    const linkType = searchParams.get('type');
    shouldRedirect = searchParams.get('shouldRedirect') === 'true';

    const baseUrl = req.nextUrl.origin;

    link = await stripe.accountLinks.create({
      account: session?.user?.stripeAccountId,
      type: linkType as Parameters<
        typeof stripe.accountLinks.create
      >[0]['type'],
      return_url: `${baseUrl}/api/account_link?shouldRedirect=true&type=${linkType}`,
      refresh_url: `${baseUrl}/api/account_link?shouldRedirect=true&type=${linkType}`,
    });
  } catch (error: any) {
    console.error('Error creating account link: ', error);
    return new Response(error.message, {status: 500});
  }

  // Returns status code 307/303 to the caller, this needs to be outside of the try/catch block since nextjs throws an error it later catches
  if (shouldRedirect) {
    redirect(link?.url, RedirectType.push);
  } else {
    return new Response(JSON.stringify({url: link?.url}), {status: 200});
  }
}
