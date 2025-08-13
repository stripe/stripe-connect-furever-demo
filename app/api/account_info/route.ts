import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {NextRequest} from 'next/server';
import Salon from '@/app/models/salon';
import dbConnect from '@/lib/dbConnect';
import {getToken} from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({req});

    if (!token?.email) {
      return new Response('Unauthorized', {status: 401});
    }
    await dbConnect();
    const user = await Salon.findOne({
      email: token?.email,
    });

    if (!user) {
      return new Response('User not found', {status: 404});
    }

    return new Response(
      JSON.stringify({
        changedPassword: user.changedPassword || false,
        password: user.changedPassword ? '' : user.password || '',
        businessName: user.businessName || '',
        setup: user.setup || false,
        email: user.email || '',
      }),
      {status: 200, headers: {'Content-Type': 'application/json'}}
    );
  } catch (error: any) {
    console.error('An error occurred when retrieving account info', error);
    return new Response(error.message, {status: 500});
  }
}
