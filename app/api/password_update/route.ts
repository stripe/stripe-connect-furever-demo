import {type NextRequest} from 'next/server';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import Salon from '@/app/models/salon';
import {getToken} from 'next-auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Unauthorized', {status: 401});
    }

    const json = await req.json();
    const token = await getToken({req});
    let user = await Salon.findOne({
      email: token?.email,
    });

    const oldPass = user?.password;

    const {newPassword} = json;
    const updatedPassword = newPassword || oldPass;
    const update = {
      password: updatedPassword,
      changedPassword: true,
    };
    console.log('updating account with, ', update);

    await Salon.findOneAndUpdate({email: session?.user?.email}, update);

    return new Response(JSON.stringify({success: true}), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    console.error('An error occurred when updating account password', error);
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  }
}
