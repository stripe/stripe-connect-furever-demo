import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {NextRequest} from 'next/server';
import Salon from '@/app/models/salon';
import dbConnect from '@/lib/dbConnect';
import {getToken} from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({req});
    const session = await getServerSession(authOptions);

    if (!token?.email || session?.user?.email != token?.email) {
      return new Response('Unauthorized', {status: 401});
    }
    await dbConnect();
    const user = await Salon.findOne({email: session.user.email});

    if (!user) {
      return new Response('User not found', {status: 404});
    }

    return new Response(
      JSON.stringify({
        changedPassword: user.changedPassword || false,
        password: user.password || '',
        businessName: user.businessName || '',
        setup: user.setup || false,
      }),
      {status: 200, headers: {'Content-Type': 'application/json'}}
    );
  } catch (error: any) {
    console.error('An error occurred when retrieving account info', error);
    return new Response(error.message, {status: 500});
  }
}
