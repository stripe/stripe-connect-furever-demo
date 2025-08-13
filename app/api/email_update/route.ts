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

    const {newEmail, inputPassword} = json;
    const token = await getToken({req});

    if (token?.email === newEmail) {
      return new Response(
        JSON.stringify({error: 'New email is the same as the old email'}),
        {
          status: 400,
          headers: {'Content-Type': 'application/json'},
        }
      );
    }

    const user = await Salon.findOne({email: token?.email});
    if (!user.validatePassword(inputPassword)) {
      return new Response(JSON.stringify({error: 'Incorrect password'}), {
        status: 400,
        headers: {'Content-Type': 'application/json'},
      });
    }
    const possibleUser = await Salon.findOne({
      email: newEmail,
    });

    if (possibleUser) {
      return new Response(JSON.stringify({error: 'Email already in use'}), {
        status: 400,
        headers: {'Content-Type': 'application/json'},
      });
    }

    const update = {
      email: newEmail,
    };
    console.log('updating account with, ', update);

    await Salon.findOneAndUpdate({email: session?.user?.email}, update);

    return new Response(
      JSON.stringify({
        email: newEmail,
      }),
      {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }
    );
  } catch (error: any) {
    console.error('An error occurred when updating account email', error);
    return new Response(JSON.stringify({error: error.message}), {
      status: 500,
      headers: {'Content-Type': 'application/json'},
    });
  }
}
